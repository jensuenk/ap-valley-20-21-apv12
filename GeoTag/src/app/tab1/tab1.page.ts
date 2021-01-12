import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { BluetoothService } from '../bluetooth.service';
import { Device, DeviceListService } from '../device-list.service';
import { WorkingNotifServiceService } from '../working-notif-service.service';


declare var google: any;

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
	map: any;
	@ViewChild('map', { read: ElementRef, static: false })
	mapRef: ElementRef;

	currentPosLongitude: any = 0;
	currentPosLatitude: any = 0;
	infoWindows: any = [];
	markers: Array<marker>

	private onMapPage: boolean = true;

	slideOpts = {
		on: {
			beforeInit() {
				const swiper = this;
				swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
				swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
				const overwriteParams = {
					slidesPerView: 1,
					slidesPerColumn: 1,
					slidesPerGroup: 1,
					watchSlidesProgress: true,
					spaceBetween: 0,
					virtualTranslate: true,
				};
				swiper.params = Object.assign(swiper.params, overwriteParams);
				swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
			},
			setTranslate() {
				const swiper = this;
				const { $, slides, rtlTranslate: rtl } = swiper;
				for (let i = 0; i < slides.length; i += 1) {
					const $slideEl = slides.eq(i);
					let progress = $slideEl[0].progress;
					if (swiper.params.flipEffect.limitRotation) {
						progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
					}
					const offset$$1 = $slideEl[0].swiperSlideOffset;
					const rotate = -180 * progress;
					let rotateY = rotate;
					let rotateX = 0;
					let tx = -offset$$1;
					let ty = 0;
					if (!swiper.isHorizontal()) {
						ty = tx;
						tx = 0;
						rotateX = -rotateY;
						rotateY = 0;
					} else if (rtl) {
						rotateY = -rotateY;
					}

					$slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

					if (swiper.params.flipEffect.slideShadows) {
						// Set shadows
						let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
						let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
						if (shadowBefore.length === 0) {
							shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
							$slideEl.append(shadowBefore);
						}
						if (shadowAfter.length === 0) {
							shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
							$slideEl.append(shadowAfter);
						}
						if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
						if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
					}
					$slideEl
						.transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
				}
			},
			setTransition(duration) {
				const swiper = this;
				const { slides, activeIndex, $wrapperEl } = swiper;
				slides
					.transition(duration)
					.find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
					.transition(duration);
				if (swiper.params.virtualTranslate && duration !== 0) {
					let eventTriggered = false;
					// eslint-disable-next-line
					slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
						if (eventTriggered) return;
						if (!swiper || swiper.destroyed) return;

						eventTriggered = true;
						swiper.animating = false;
						const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
						for (let i = 0; i < triggerEvents.length; i += 1) {
							$wrapperEl.trigger(triggerEvents[i]);
						}
					});
				}
			}
		}
	};

	constructor(
		private geolocation: Geolocation,
		private auth: AuthService,
		private router: Router,
		private deviceListService: DeviceListService,
		private bluetoothService: BluetoothService,
		private notificationService: WorkingNotifServiceService,
		private loadingController: LoadingController,
		private ngZone: NgZone) {
		if (!auth.isLoggedIn) {
			this.router.navigate(['login']);
		}
	}

	async ionViewDidEnter() {
		this.deviceListService.deviceCollection.valueChanges().subscribe((data) => {
		})
		this.showMap();
	}

	async ngOnInit() {
		const loading = await this.loadingController.create({
			spinner: "circles",
			message: 'Please wait...',
			duration: 5000
		  });
		await loading.present();

		await new Promise(resolve => setTimeout(resolve, 1000));
		this.bluetoothService.scan();
		await new Promise(resolve => setTimeout(resolve, 3000));
		this.deviceListService.deviceCollection.valueChanges().subscribe(data => {
			this.connectDevices();
		});
		await new Promise(resolve => setTimeout(resolve, 1000));
		this.showMap();
	}

	connectDevices() {
		this.deviceListService.deviceList.forEach((device) => {
			device.isConnected = false;
			this.ngZone.run(() => {
				this.bluetoothService.connect(device);
			});
		});
	}

	showDeviceList() {
		let div = document.getElementsByClassName('deviceDiv') as HTMLCollectionOf<HTMLElement>;
		let div1 = document.getElementsByClassName('showDevicesDiv') as HTMLCollectionOf<HTMLElement>;

		if (div[0].style.height != "70%") {
			div[0].style.bottom = "0%"
			div[0].style.height = "70%"
		}
		else {
			div[0].style.bottom = "-46%"
			div[0].style.height = "50%"
		}

		if (div1[0].style.bottom != "70%") {
			div1[0].style.bottom = "70%"
		}
		else {
			div1[0].style.bottom = "4%"
		}
	}

	LockSwipes(slides: any) {
		slides.lockSwipes(true);
	}

	GoNextSlide(slides: any) {
		slides.lockSwipes(false)
		slides.slideNext();
		slides.lockSwipes(true);
		this.onMapPage = false;
	}

	GoLastSlide(slides: any) {
		slides.lockSwipes(false)
		slides.slidePrev();
		slides.lockSwipes(true)
		this.onMapPage = true;
	}

	createMarkers() {
		this.markers = Array<marker>()
		for (let device of this.deviceListService.deviceList) {
			this.markers.push({ title: device.name, latitude: device.location.latitude, longitude: device.location.longitude, connectionStatus: device.isConnected });
		}
	}

	addMarkersToMap(markers) {
		for (let marker of markers) {
			let position = new google.maps.LatLng(marker.latitude, marker.longitude);
			let mapMarker = new google.maps.Marker({
				position: position,
				title: marker.title,
				latitude: marker.latitude,
				longitude: marker.longitude
			});

			mapMarker.setMap(this.map);
			this.addInfoWindowToMarker(mapMarker, marker.connectionStatus);
		}
	}
	addInfoWindowToMarker(marker, status) {
		let connectionStatus = "Not Connected";
		
		if (status) {
			connectionStatus = "Connected";
		}
		let infoWindowContent =
			'<div id="content">' +
			'<h2 id="firstHeading" class"firstHeading">' +
			marker.title +
			'</h2>' +
			'<p>Status: ' +
			connectionStatus +
			'</p></div>'

		let infoWindow = new google.maps.InfoWindow({
			content: infoWindowContent
		});

		marker.addListener('click', () => {
			this.closeAllInfoWindows();
			infoWindow.open(this.map, marker);
		});
		this.infoWindows.push(infoWindow);
	}

	closeAllInfoWindows() {
		for (let window of this.infoWindows) {
			window.close();
		}
	}

	async showMap() {
		const location = new google.maps.LatLng(this.currentPosLatitude, this.currentPosLongitude);
		const options = {
			center: location,
			zoom: 15,
			disableDefaultUI: true
		};
		this.map = new google.maps.Map(this.mapRef.nativeElement, options);
		this.updatePostion();
		await new Promise(resolve => setTimeout(resolve, 1000));

		this.createMarkers();
		this.addMarkersToMap(this.markers);
	}

	updatePostion() {
		this.geolocation
			.getCurrentPosition()
			.then((resp) => {
				this.currentPosLatitude = resp.coords.latitude;
				this.currentPosLongitude = resp.coords.longitude;
			})
			.catch((error) => {
				console.log('Error getting location', error);
			});
	}

	goToDetails() { }
}

export class marker {
	title: string;
	latitude: number;
	longitude: number;
	connectionStatus: boolean;
}
