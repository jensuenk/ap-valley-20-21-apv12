import { Component } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	constructor(private notificationService: NotificationService) {
	}

	ngOnInit() {
	}
}
