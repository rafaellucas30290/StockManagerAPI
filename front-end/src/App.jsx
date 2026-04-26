import { useState, useEffect, useCallback } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import { getAllProducts, createProduct, updateProduct, deleteProduct } from './api/produtos'
import './index.css'

export default function App() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [listLoading, setListLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchProducts = useCallback(async () => {
    setListLoading(true)
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch {
      showToast('Erro ao carregar produtos', 'error')
    } finally {
      setListLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  async function handleSubmit(product) {
    setFormLoading(true)
    try {
      if (product.id) {
        await updateProduct(product)
        showToast('Produto atualizado!')
      } else {
        await createProduct(product)
        showToast('Produto criado!')
      }
      setEditingProduct(null)
      fetchProducts()
    } finally {
      setFormLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Deseja excluir este produto?')) return
    try {
      await deleteProduct(id)
      showToast('Produto excluído!')
      fetchProducts()
    } catch {
      showToast('Erro ao excluir produto', 'error')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-bracket">[</span>
            <span className="logo-text">STOCK</span>
            <span className="logo-accent">MANAGER</span>
            <span className="logo-bracket">]</span>
          </div>
          <span className="header-sub">API v0.0.1 · localhost:8080</span>
        </div>
      </header>

      <main className="app-main">
        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancelEdit={() => setEditingProduct(null)}
          loading={formLoading}
        />
        <ProductList
          products={products}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
          loading={listLoading}
        />
      </main>

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.msg}
        </div>
      )}
    </div>
  )
}
