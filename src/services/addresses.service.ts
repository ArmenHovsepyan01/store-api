import { Addresses } from '../database/models/models';
import { AddressesInput } from '../database/models/addresses';
import { createValuesFromReqBody } from '../helpers/createValuesFromReqBody';
import { addAbortSignal } from 'node:stream';

async function getUserAddresses(id: number) {
  try {
    return await Addresses.findAll({
      where: {
        user_id: id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function createAddress(address: AddressesInput) {
  try {
    return await Addresses.create(address);
  } catch (e) {
    throw new Error(e);
  }
}

async function updateAddress(id: number, values: AddressesInput) {
  try {
    return await Addresses.update(values, {
      where: {
        id
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function deleteAddress(id: number) {
  try {
    await Addresses.destroy({
      where: {
        id
      }
    });

    return `Address with id ${id} successfully deleted.`;
  } catch (e) {
    throw new Error(e);
  }
}

export default { getUserAddresses, deleteAddress, createAddress, updateAddress };
