import ProductModel from '../../models/product.model'
import dbclient from '../../db/db'
import Product from '../../types/product.type'

const productModel = new ProductModel()

describe('Product Model', () => {
  describe('Test Product Methods Exists', () => {
    it('should have a get products method', () => {
      expect(productModel.getAllProducts).toBeDefined()
    })
    it('should have a create product method', () => {
      expect(productModel.createProduct).toBeDefined()
    })
    it('should have a get product method', () => {
      expect(productModel.getProductById).toBeDefined()
    })
    it('should have a delete a product method', () => {
      expect(productModel.deleteProduct).toBeDefined()
    })
    it('should have a update a product method', () => {
      expect(productModel.updateProduct).toBeDefined()
    })
  })

  describe('Test product model logic', () => {
    const product = {
      name: 'Tshirt',
      price: 100
    } as Product
    beforeAll(async () => {
      const createdProduct = await productModel.createProduct(product)
      product.id = createdProduct.id
    })
    afterAll(async () => {
      const connection = await dbclient.connect()
      // alter sequence id to 1
      await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1')
      await connection.query('DELETE FROM products;')
      connection.release()
    })
    // Testing create method
    it('Create method should return a New Product', async () => {
      const createdProduct = await productModel.createProduct({
        name: 'Pants',
        price: 200.5
      } as Product)
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: 'Pants',
        price: 200.5
      } as Product)
    })

    // Testing get all products method
    it('should return all products', async () => {
      const products = await productModel.getAllProducts()
      expect(products.length).toBeGreaterThan(0)
    })

    // Testing get product by id method
    it('should get a product by id', async () => {
      const getProduct = await productModel.getProductById(product.id)
      expect(getProduct).toEqual(product)
    })

    // Testing update a product method
    it('should update a product', async () => {
      const updatedProduct = await productModel.updateProduct({
        ...product,
        name: 'Tshirt',
        price: 300.5
      })
      expect(updatedProduct.id).toBe(product.id)
      expect(updatedProduct.name).toBe('Tshirt')
      expect(updatedProduct.price).toBe(300.5)
    })

    // Testing delete a product method
    it('should delete a product', async () => {
      const deletedProduct = await productModel.deleteProduct(product.id)
      expect(deletedProduct.id).toBe(product.id)
    })
  })
})
