package com.projetoDevOps.ItemStockAPI.ProductTests;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.projetoDevOps.ItemStockAPI.product.model.Product;
import com.projetoDevOps.ItemStockAPI.product.repository.ProductRepository;
import com.projetoDevOps.ItemStockAPI.product.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    public ProductServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProduct_shouldThrowException_whenNameIsEmpty() {
        Product product = new Product();
        product.setName("");
        product.setPrice(10.0);
        product.setQuantity(5);

        assertThatThrownBy(() -> productService.createProduct(product))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Nome do produto não pode ser vazio");
    }
    @Test
    void createProduct_shouldThrowException_whenPriceIsZeroOrNegative() {
        Product product = new Product();
        product.setName("Produto X");
        product.setPrice(0.0); // preço inválido
        product.setQuantity(5);

        assertThatThrownBy(() -> productService.createProduct(product))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Preço deve ser maior que zero");

        product.setPrice(-10.0); // preço negativo
        assertThatThrownBy(() -> productService.createProduct(product))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Preço deve ser maior que zero");
    }
    @Test
    void createProduct_shouldThrowException_whenQuantityIsNegative() {
        Product product = new Product();
        product.setName("Produto Y");
        product.setPrice(10.0);
        product.setQuantity(-5); // quantidade inválida

        assertThatThrownBy(() -> productService.createProduct(product))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Quantidade não pode ser negativa");
    }

}