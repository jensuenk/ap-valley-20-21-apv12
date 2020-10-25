import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./auth/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'device-details/:id',
    loadChildren: () => import('./device-details/device-details.module').then( m => m.DeviceDetailsPageModule)
  },
  {
    path: 'alert-settings',
    loadChildren: () => import('./alert-settings/alert-settings.module').then( m => m.AlertSettingsPageModule)
  },
  {
    path: 'location-history',
    loadChildren: () => import('./location-history/location-history.module').then( m => m.LocationHistoryPageModule)
  },  {
    path: 'ring-modal',
    loadChildren: () => import('./ring-modal/ring-modal.module').then( m => m.RingModalPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
