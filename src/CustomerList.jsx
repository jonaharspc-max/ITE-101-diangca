export default function CustomerList({ customers, onRemoveCustomer }) {
  return (
    <ul className="customer-list">
      {customers.map((customer) => (
        <li key={customer.id}>
          <span>{customer.name}</span>
          <button
            type="button"
            className="remove-button"
            onClick={() => onRemoveCustomer(customer.id)}
            aria-label={`Remove ${customer.name}`}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}
