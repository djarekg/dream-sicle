import { email, required, schema } from '@angular/forms/signals';
import { UserFormModel } from './user-form.model.js';

export const userSchema = schema<UserFormModel>(path => {
  required(path.firstName, { message: 'First Name is required' });
  required(path.lastName, { message: 'Last Name is required' });
  required(path.gender, { message: 'Gender is required' });
  required(path.email, { message: 'Email is required' });
  required(path.phone, { message: 'Phone is required' });
  required(path.streetAddress, { message: 'Street Address is required' });
  required(path.city, { message: 'City is required' });
  required(path.stateId, { message: 'State is required' });
  required(path.zip, { message: 'ZIP is required' });
  required(path.isActive, { message: 'Active status is required' });

  email(path.email, { message: 'Email is invalid' });
});
