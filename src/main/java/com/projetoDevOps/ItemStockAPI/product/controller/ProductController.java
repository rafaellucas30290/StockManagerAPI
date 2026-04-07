package com.projetoDevOps.ItemStockAPI.product.controller;

import com.projetoDevOps.ItemStockAPI.product.model.Product;
import com.projetoDevOps.ItemStockAPI.product.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProductController {


    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@RequestBody Product product){
        return service.createProduct(product);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Product findById(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Product> getAllProducts(){
        return service.findAllProducts();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(Long id){
        service.deleteProduct(id);
    }
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public Product update(@RequestBody Product product){
        return service.updateProduct(product);
    }

}
