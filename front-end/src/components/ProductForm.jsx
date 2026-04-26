import { useState, useEffect } from 'react'

const emptyForm = { name: '', price: '', quantity: '' }

export default function ProductForm({ onSubmit, editingProduct, onCancelEdit, loading }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingProduct) {
      setForm({
        id: editingProduct.id,
        name: editingProduct.name,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
      })
    } else {
      setForm(emptyForm)
    }
    setError('')
  }, [editingProduct])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) return setError('Nome é obrigatório')
    if (!form.price || Number(form.price) <= 0) return setError('Preço deve ser maior que zero')
    if (form.quantity === '' || Number(form.quantity) < 0) return setError('Quantidade não pode ser negativa')

    try {
      await onSubmit({
        ...(form.id ? { id: form.id } : {}),
        name: form.name.trim(),
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity),
      })
      setForm(emptyForm)
    } catch (err) {
      setError(err.message)
    }
  }

  const isEditing = !!editingProduct

  return (
    <div className="form-card">
      <div className="form-header">
        <span className="form-title">
          {isEditing ? '// EDITAR PRODUTO' : '// NOVO PRODUTO'}
        </span>
        {isEditing && (
          <button className="btn-cancel" onClick={onCancelEdit}>
            cancelar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="form-body">
        <div className="field-group">
          <label className="field-label">NOME</label>
          <input
            className="field-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="ex: Parafuso M6"
            autoComplete="off"
          />
        </div>

        <div className="field-row">
          <div className="field-group">
            <label className="field-label">PREÇO (R$)</label>
            <input
              className="field-input"
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>
          <div className="field-group">
            <label className="field-label">QUANTIDADE</label>
            <input
              className="field-input"
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>

        {error && <p className="form-error">⚠ {error}</p>}

        <button className="btn-submit" type="submit" disabled={loading}>
          {loading ? 'aguarde...' : isEditing ? 'salvar alterações' : 'adicionar produto'}
        </button>
      </form>
    </div>
  )
}
