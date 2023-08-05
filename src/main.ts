import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWmhAYVBpR2NbfE5xfldDal9TVBYiSV9jS31TfkVnWHxcd3dWTmJUWA==');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
