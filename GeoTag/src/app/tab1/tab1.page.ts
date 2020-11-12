import { Component, ViewChild, ElementRef, defineInjectable, OnInit } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { title } from 'process';
import { AuthService } from '../auth/auth.service';
import { Device, DeviceListService } from '../device-list.service';
import { LocalNotificationsService } from '../local-notifications.service';

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


	constructor(
		private geolocation: Geolocation, 
		private auth: AuthService, 
		private router: Router, 
		private deviceListService: DeviceListService,
		private localNotifs: LocalNotificationsService) {
		if (!auth.isLoggedIn) {
			this.router.navigate(['login']);
		}
  }

	ionViewDidEnter() {
    this.deviceListService.deviceCollection.valueChanges().subscribe((data) => {
			this.createMarkers();
			this.showMap();
		})
  }

	ngOnInit() {
		this.deviceListService.deviceCollection.valueChanges().subscribe((data) => {
			this.createMarkers();
			this.showMap();
		})
		this.deviceListService.createTestDevice()
	}

	createMarkers() {
		this.markers = Array<marker>()
		for (let device of this.deviceListService.deviceList) {
			this.markers.push({ title: device.name, latitude: device.location.latitude, longitude: device.location.longitude });
		}
		console.log(this.markers)
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
			this.addInfoWindowToMarker(mapMarker);
		}
	}
	addInfoWindowToMarker(marker) {
		let infoWindowContent =
			'<div id="content">' +
			'<h2 id="firstHeading" class"firstHeading">' +
			marker.title +
			'</h2>' +
			'<p>Latitude: ' +
			marker.latitude +
			'</p>' +
			'<p>Longitude: ' +
			marker.longitude +
			'</p>' +
			'</div>';

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

	showMap() {
		const location = new google.maps.LatLng(this.currentPosLatitude, this.currentPosLongitude);
		const options = {
			center: location,
			zoom: 15,
			disableDefaultUI: true,
			styles:
				[
					{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
					{ elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
					{ elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
					{
						featureType: 'administrative.locality',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#d59563' }]
					},
					{
						featureType: 'poi',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#d59563' }]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [{ color: '#263c3f' }]
					},
					{
						featureType: 'poi.park',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#6b9a76' }]
					},
					{
						featureType: 'road',
						elementType: 'geometry',
						stylers: [{ color: '#38414e' }]
					},
					{
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [{ color: '#212a37' }]
					},
					{
						featureType: 'road',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#9ca5b3' }]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry',
						stylers: [{ color: '#746855' }]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [{ color: '#1f2835' }]
					},
					{
						featureType: 'road.highway',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#f3d19c' }]
					},
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [{ color: '#2f3948' }]
					},
					{
						featureType: 'transit.station',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#d59563' }]
					},
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [{ color: '#17263c' }]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.fill',
						stylers: [{ color: '#515c6d' }]
					},
					{
						featureType: 'water',
						elementType: 'labels.text.stroke',
						stylers: [{ color: '#17263c' }]
					}
				]
		};
		this.map = new google.maps.Map(this.mapRef.nativeElement, options);
		this.updatePostion();
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
}
