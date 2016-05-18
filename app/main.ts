import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app/app.component';
import { PeopleService } from './services/people/people.service';
import { HTTP_PROVIDERS } from '@angular/http';

bootstrap(AppComponent, [PeopleService, HTTP_PROVIDERS]);
