import fs from "fs"

const path = "./src/data/products.json"

class ProductManager{

    constructor(path){
        this.path = path
    }

    async addProduct(product){

        const { title, description, code, price, status, stock, category, thumbnail } = product;

        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail ) return "No se registró correctamente el ingreso de toda la información necesaria, intente nuevamente";
        
        const products = await this.getProducts();

        const actualPid = products.length > 0 ? Math.max(...products.map(product => product.pid)) : 0; //Busco máximo ID en array contenedor products para referencia en nuevo producto si fuera necesario

        const existingCode = products.find((product) => product.code === code);

        if (!existingCode){
            const newProduct = {
                pid: actualPid + 1,
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnail: thumbnail,
            };
            products.push(newProduct);
        }else{
            existingCode.stock += stock;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

    async getProducts(){
        
        if(fs.existsSync(this.path)){
            const products = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(products);
        } return [];

    }

    async getProductById(pid){
        try {
            const products = await this.getProducts();
            const filteredProduct = products.find((product) => product.pid === Number(pid));
            console.log(pid);
            console.log(filteredProduct);
            if(!filteredProduct) throw new Error("No se ha encontrado un producto con el ID solicitado"); 
            return filteredProduct;
        } catch (error) {
            throw error;
        }
    }

}

export const productManager = new ProductManager(path)

