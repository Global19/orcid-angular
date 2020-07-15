import { NgModule } from '@angular/core'
import { RouterModule, Routes, UrlSegment } from '@angular/router'

import {
  isValidOrcidFormat,
  URL_PRIVATE_PROFILE,
  ApplicationRoutes,
} from './constants'
import { OauthGuard } from './guards/oauth.guard'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { SignInGuard } from './guards/sign-in.guard'

export function matcher(segments: UrlSegment[]) {
  if (
    (segments[0] && isValidOrcidFormat(segments[0].path)) ||
    (segments[0] && segments[0].path.toLowerCase() === URL_PRIVATE_PROFILE)
  ) {
    return { consumed: [segments[0]] }
  }
  return {
    consumed: [],
  }
}

const routes: Routes = [
  {
    path: ApplicationRoutes.home,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  // {
  //   matcher: matcher,
  //   loadChildren:
  //   () => import('./profile/profile.module').then(m => m.ProfileModule)
  // },
  {
    path: ApplicationRoutes.inbox,
    canActivateChild: [AuthenticatedGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then((m) => m.InboxModule),
  },
  {
    path: ApplicationRoutes.authorize,
    canActivateChild: [OauthGuard],
    loadChildren: () =>
      import('./authorize/authorize.module').then((m) => m.AuthorizeModule),
  },
  {
    path: ApplicationRoutes.institutional,
    loadChildren: () =>
      import('./institutional/institutional.module').then(
        (m) => m.InstitutionalModule
      ),
  },
  {
    path: ApplicationRoutes.social,
    loadChildren: () =>
      import('./link-account/link-account.module').then(
        (m) => m.LinkAccountModule
      ),
  },
  {
    path: ApplicationRoutes.institutionalLinking,
    loadChildren: () =>
      import('./link-account/link-account.module').then(
        (m) => m.LinkAccountModule
      ),
  },
  {
    path: ApplicationRoutes.login,
    redirectTo: ApplicationRoutes.signin,
  },
  {
    path: ApplicationRoutes.signin,
    canActivateChild: [SignInGuard, OauthGuard],
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: ApplicationRoutes.resetPassword,
    loadChildren: () =>
      import('./password-recovery/password-recovery.module').then(
        (m) => m.PasswordRecoveryModule
      ),
  },
  {
    path: ApplicationRoutes.register,
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: ApplicationRoutes.search,
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
