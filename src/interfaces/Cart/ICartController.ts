export interface ICartController {
  getCart(req: Request, res: Response): Promise<void>;
  addToCart(req: Request, res: Response): Promise<void>;
  removeFromCart(req: Request, res: Response): Promise<void>;
}
