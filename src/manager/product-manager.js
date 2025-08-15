import fs from "fs"

const path = "./src/data/products.json"

class ProductManager{

    constructor(path){
        this.path = path
    }

    async addProduct(product){

        try {
            const { title, description, code, price, status, stock, category, thumbnails } = product;
            if (!title || !description || !code || price == null || status == null || stock == null || !category || !thumbnails ) return "No se registró correctamente el ingreso de toda la información necesaria, intente nuevamente"; // A price, status y stock los dejo con la comparativa null, más pensando en realidad por status, ya que al permitir valor booleano puedo romper la ejecución en la lógica de validación si no apunto al null 
    
            const products = await this.getProducts();
            const actualPid = products.length > 0 ? Math.max(...products.map(product => product.pid)) : 0; //Busco máximo ID en array contenedor products para referencia en nuevo producto si fuera necesario
            
            const newProduct = {
                pid: actualPid + 1,
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnails: thumbnails,
            };
            products.push(newProduct);
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(product, pid){
        
        try {
            const { title, description, code, price, status, stock, category, thumbnails } = product;
            if (!title || !description || !code || price == null || status == null || stock == null || !category || !thumbnails ) return "No se registró correctamente el ingreso de toda la información necesaria, intente nuevamente"; // A price, status y stock los dejo con la comparativa null, más pensando en realidad por status, ya que al permitir valor booleano puedo romper la ejecución en la lógica de validación si no apunto al null 
    
            const products = await this.getProducts();
            let existingProduct = await this.getProductById(pid);

            existingProduct = { pid: existingProduct.pid , ...product };
            const renewProducts = products.filter((product) => product.pid !== Number(pid));

            renewProducts.push(existingProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(renewProducts));
            return existingProduct;
        } catch (error) {
            throw error;
        }
    }

    async getProducts(){
        
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products);
            } return [];
        } catch (error) {
            throw error;
        }
    }

    async getProductById(pid){
        try {
            const products = await this.getProducts();
            const filteredProduct = products.find((product) => product.pid === Number(pid));
            if(!filteredProduct) throw new Error("No se ha encontrado un producto con el ID solicitado"); 
            return filteredProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(pid){
        try {
            const product = await this.getProducts();
            if (product.length > 0){
                const seekProduct = await this.getProductById(pid);
                const renewProducts = product.filter((product) => product.pid !== Number(pid));
                await fs.promises.writeFile(this.path, JSON.stringify(renewProducts));
                return seekProduct;
            }
        } catch (error) {
            throw error
        }
    }

}

export const productManager = new ProductManager(path)

