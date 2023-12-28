export class Product {
  constructor(
    public id: number,
    public sku: string,
    public name: string,
    public description: string,
    public unitPrice: number,
    public active: boolean,
    public unitsInStock: number,
    public imageUrl: string, // << Add this in!
    public dateCreated: Date,
    public lastUpdated: Date
  ) {}
}
