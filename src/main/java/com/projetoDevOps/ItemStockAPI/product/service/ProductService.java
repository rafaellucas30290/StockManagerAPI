package com.projetoDevOps.ItemStockAPI.product.service;

import com.projetoDevOps.ItemStockAPI.product.model.Product;
import com.projetoDevOps.ItemStockAPI.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        if(product.getName() == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto precisa ter um nome");
        }
        if(product.getPrice() <= 0){
            throw new  ResponseStatusException(HttpStatus.BAD_REQUEST, "Preco nao pode ser 0");
        }

        if (product.getQuantity() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade não pode ser negativa");
        }
        return productRepository.save(product);
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    public Product updateProduct(Product product) {
       Product existing = productRepository.findById(product.getId()).
               orElseThrow(() -> new RuntimeException("Produto não encontrado"));

       existing.setName(product.getName());
       existing.setPrice(product.getPrice());
       existing.setQuantity(product.getQuantity());

       return productRepository.save(existing);

    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

}
