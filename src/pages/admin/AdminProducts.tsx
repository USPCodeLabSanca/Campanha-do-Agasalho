import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { AdminPageHeader } from '../../components/admin/AdminPageHeader'
import { AdminSearch } from '../../components/admin/AdminSearch'
import { AdminFilterChip } from '../../components/admin/AdminFilterChip'
import { AdminListItem } from '../../components/admin/AdminListItem'
import { ConfirmDialog } from '../../components/admin/ConfirmDialog'
import { AdminToast } from '../../components/admin/AdminToast'
import { ProductForm } from '../../components/admin/products/ProductForm'

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../../services/shop'
import { PRODUCT_CATEGORY_LABELS } from '../../constants/shop'
import type { Product, ProductInput } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'

type Editing = Product | 'new' | null

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [onlySoldOut, setOnlySoldOut] = useState(false)
  const location = useLocation()
  const [editing, setEditing] = useState<Editing>(
    location.state?.openNewForm ? 'new' : null,
  )
  const [isSaving, setIsSaving] = useState(false)
  const [deleting, setDeleting] = useState<Product | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setIsLoading(false)
    })
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  async function handleSave(input: ProductInput) {
    setIsSaving(true)

    if (editing === 'new') {
      const created = await createProduct(input)
      setProducts((prev) => [...prev, created])
      setToast('Produto adicionado')
    } else if (editing) {
      const updated = await updateProduct(editing.id, input)
      setProducts((prev) =>
        prev.map((product) => (product.id === updated.id ? updated : product)),
      )
      setToast('Alterações salvas')
    }

    setIsSaving(false)
    setEditing(null)
  }

  async function handleDelete() {
    if (!deleting) return

    await deleteProduct(deleting.id)
    setProducts((prev) => prev.filter((product) => product.id !== deleting.id))
    setDeleting(null)
    setToast('Produto excluído')
  }

  const soldOutCount = products.filter((product) => product.isSoldOut).length

  const searchText = search.trim().toLowerCase()
  const visibleProducts = products.filter((product) => {
    if (onlySoldOut && !product.isSoldOut) return false

    return product.name.toLowerCase().includes(searchText)
  })

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Produtos da lojinha"
        description="Produtos vendidos na Lojinha para arrecadar fundos para a campanha."
        onAdd={() => setEditing('new')}
      />

      <div className="flex flex-wrap items-center gap-3">
        <AdminSearch
          label="Buscar por nome"
          value={search}
          onChange={setSearch}
        />
        <AdminFilterChip
          label="Esgotados"
          count={soldOutCount}
          isActive={onlySoldOut}
          onToggle={() => setOnlySoldOut((prev) => !prev)}
        />
      </div>

      {isLoading && <p className="text-body">Carregando...</p>}

      {!isLoading && products.length === 0 && (
        <p className="text-body">Nenhum produto cadastrado ainda.</p>
      )}

      {!isLoading && products.length > 0 && visibleProducts.length === 0 && (
        <p className="text-body">Nenhum produto encontrado.</p>
      )}

      {visibleProducts.length > 0 && (
        <ul className="flex flex-col gap-3">
          {visibleProducts.map((product) => (
            <AdminListItem
              key={product.id}
              title={product.name}
              details={`${PRODUCT_CATEGORY_LABELS[product.category]} · ${formatPrice(product.price, 'pt')}`}
              status={{
                label: product.isSoldOut ? 'Esgotado' : 'Disponível',
                isPositive: !product.isSoldOut,
              }}
              onEdit={() => setEditing(product)}
              onDelete={() => setDeleting(product)}
            />
          ))}
        </ul>
      )}

      {editing && (
        <ProductForm
          product={editing === 'new' ? undefined : editing}
          isSaving={isSaving}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Excluir produto?"
          message={`"${deleting.name}" vai sair da Lojinha. Isso não pode ser desfeito.`}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}

      {toast && <AdminToast message={toast} onHide={hideToast} />}
    </div>
  )
}
