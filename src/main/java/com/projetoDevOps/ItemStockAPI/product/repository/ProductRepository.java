package com.projetoDevOps.ItemStockAPI.product.repository;

import com.projetoDevOps.ItemStockAPI.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
}
