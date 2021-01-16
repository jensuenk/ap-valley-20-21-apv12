import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceListService } from '../device-list.service';
import { NotificationService } from '../notification.service';

declare var google: any;

@Component({
	selector: 'app-location-history',
	templateUrl: './location-history.page.html',
	styleUrls: ['./location-history.page.scss'],
})
export class LocationHistoryPage implements OnInit {

	currentDevice: Device

	constructor(private deviceListService: DeviceListService, private notificationService: NotificationService, private route: ActivatedRoute) { }

	map: any;
	@ViewChild('map', { read: ElementRef, static: false })
	mapRef: ElementRef;

	infoWindows: any = [];
	markers: Array<marker>

	ngOnInit() {
		this.findCurrentDevice()
		this.currentDevice.locationHistory.sort((a, b) => b.date.getTime() - a.date.getTime())
	}
	findCurrentDevice() {
		this.currentDevice = this.deviceListService.deviceList.find(x => x.id == this.route.snapshot.paramMap.get('id'));
	}

	ionViewDidEnter() {
		this.createMarkers();
		this.showMap();
		this.currentDevice.locationHistory.sort((a, b) => b.date.getTime() - a.date.getTime())
	}

	createMarkers() {
		this.markers = Array<marker>()
		for (let notif of this.currentDevice.locationHistory) {
			this.markers.push({ title: "Lost " + this.currentDevice.name, latitude: notif.location.latitude, longitude: notif.location.longitude });
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
		}
	}

	closeAllInfoWindows() {
		for (let window of this.infoWindows) {
			window.close();
		}
	}

	showMap(latitude: number = this.currentDevice.locationHistory[0].location.latitude, longitude: number = this.currentDevice.locationHistory[0].location.longitude) {
		const location = new google.maps.LatLng(latitude, longitude);
		const options = {
			center: location,
			zoom: 15,
			disableDefaultUI: true
		};
		this.map = new google.maps.Map(this.mapRef.nativeElement, options);
		this.addMarkersToMap(this.markers);
		console.log(this.markers)
	}

	moveCamera(longitude: number, latitude: number) {
		this.showMap(latitude, longitude)
	}
}

export class marker {
	title: string;
	latitude: number;
	longitude: number;
}
