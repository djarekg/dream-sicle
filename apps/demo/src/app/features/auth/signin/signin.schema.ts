import { required, schema } from '@angular/forms/signals';

import { SigninModel } from './signin.model';

export const signinSchema = schema<SigninModel>(path => {
  required(path.email, { message: 'Email is required' });
  required(path.password, { message: 'Password is required' });
});
