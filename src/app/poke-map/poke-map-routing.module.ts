import { FullMapComponent } from './pages/full-map/full-map.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'fullMap', component: FullMapComponent },
      { path: '**', redirectTo: 'fullMap' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokeMapRoutingModule {}
