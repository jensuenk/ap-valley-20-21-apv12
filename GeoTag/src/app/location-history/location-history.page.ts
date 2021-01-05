import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device, DeviceListService, Location } from '../device-list.service';

declare var google: any;

@Component({
	selector: 'app-location-history',
	templateUrl: './location-history.page.html',
	styleUrls: ['./location-history.page.scss'],
})
export class LocationHistoryPage implements OnInit {

	currentDevice: Device

	constructor(private deviceListService: DeviceListService, private route: ActivatedRoute) { }

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
		this.currentDevice = this.deviceListService.deviceList.find(x => x.id == this.route.snapshot.paramMap.get('id'))
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
			this.addInfoWindowToMarker(mapMarker);
		}
	}
	addInfoWindowToMarker(marker) {
		let infoWindowContent =
			'<div id="content">' +
			'<h2 id="firstHeading" class"firstHeading">' +
			marker.title +
			'</h2>' +
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

	showMap(latitude: number = this.currentDevice.locationHistory[0].location.latitude, longitude: number = this.currentDevice.locationHistory[0].location.longitude) {
		const location = new google.maps.LatLng(latitude, longitude);
		const options = {
			center: location,
			zoom: 15,
			disableDefaultUI: true/*,
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
				]*/
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
