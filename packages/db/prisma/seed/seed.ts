import { createPrismaClient } from '../../src/client/index.ts';
import { createCustomerContactFTS } from '../fts/create-customer-contact-fts.ts';
import { createCustomerFTS } from '../fts/create-customer-fts.ts';
import { createProductFTS } from '../fts/create-product-fts.ts';
import { createUserFTS } from '../fts/create-user-fts.ts';
import { createCustomerContacts } from './customer-contact.ts';
import { createCustomers } from './customer.ts';
import { createProductColors } from './product-color.ts';
import { createProductInventories } from './product-inventory.ts';
import { createProductSales } from './product-sale.ts';
import { createProducts } from './product.ts';
import { createStates } from './state.ts';
import { createUserCredential } from './user-credential.ts';
import { createUsers } from './user.ts';

const prisma = createPrismaClient();

const load = async () => {
  await createStates(prisma);
  await createUsers(prisma);
  await createUserCredential(prisma);
  await createCustomers(prisma);
  await createCustomerContacts(prisma);
  await createProducts(prisma);
  await createProductColors(prisma);
  await createProductInventories(prisma);
  await createProductSales(prisma);

  await createUserFTS(prisma);
  await createCustomerFTS(prisma);
  await createCustomerContactFTS(prisma);
  await createProductFTS(prisma);
};

load()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    // Disconnecting needs to wait at least 1 second to ensure all
    // operations are completed.
    setTimeout(async () => {
      await prisma.$disconnect();
    }, 1000);
  });
