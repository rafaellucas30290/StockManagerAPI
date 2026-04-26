export default function ProductList({ products, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="list-card">
        <p className="list-loading">carregando estoque...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="list-card">
        <p className="list-empty">nenhum produto cadastrado.</p>
      </div>
    )
  }

  return (
    <div className="list-card">
      <div className="list-header">
        <span className="form-title">// ESTOQUE</span>
        <span className="list-count">{products.length} item(s)</span>
      </div>
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>#ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>QTD</th>
              <th>STATUS</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className={p.quantity === 0 ? 'row-empty-stock' : ''}>
                <td className="col-id">{p.id}</td>
                <td className="col-name">{p.name}</td>
                <td className="col-price">
                  {p.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="col-qty">{p.quantity}</td>
                <td className="col-status">
                  {p.quantity === 0
                    ? <span className="badge badge-out">sem estoque</span>
                    : p.quantity < 5
                    ? <span className="badge badge-low">estoque baixo</span>
                    : <span className="badge badge-ok">ok</span>
                  }
                </td>
                <td className="col-actions">
                  <button className="btn-edit" onClick={() => onEdit(p)}>editar</button>
                  <button className="btn-delete" onClick={() => onDelete(p.id)}>excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
