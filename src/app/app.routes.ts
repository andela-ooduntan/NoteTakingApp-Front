import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewNoteComponent } from './newNote/newNote.component'

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'createNote', component: NewNoteComponent },
];

export const appRoutes = RouterModule.forRoot(routes, { useHash: true });
