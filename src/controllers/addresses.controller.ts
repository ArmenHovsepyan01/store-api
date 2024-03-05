import { Request, Response } from 'express';
import addressesService from '../services/addresses.service';

async function get(req: Request, res: Response) {
  try {
    const { user_id } = req.body;

    const userAddresses = await addressesService.getUserAddresses(+user_id);
    console.log(userAddresses);

    res.status(200).json({
      message: '',
      addresses: userAddresses
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function create(req: Request, res: Response) {
  try {
    const address = await addressesService.createAddress(req.body);

    res.status(200).json({
      message: '',
      data: address
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function updateAddress(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const info = await addressesService.updateAddress(+id, req.body);

    if (!info)
      return res.status(500).json({
        message: 'Something gone wrong.'
      });

    res.status(200).json({
      message: '',
      data: info
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

async function deleteAddress(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const message = await addressesService.deleteAddress(+id);

    res.status(200).json({
      message
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

export default {
  get,
  create,
  updateAddress,
  deleteAddress
};
