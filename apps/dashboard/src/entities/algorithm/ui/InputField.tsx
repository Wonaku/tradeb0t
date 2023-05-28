import type { OperationType } from '@tradeb0t/core'
import { EInputType, EOperationType } from '@tradeb0t/core/dist/enums'
import { InputHTMLAttributes, useRef } from 'react'
import { TypeFromInputType } from '../model/TypeFromInputType'

export type InputFieldProps<T extends `${EInputType}`> = {
  name: string
  type: T
  value: TypeFromInputType<T>
  onUpdate: (value: TypeFromInputType<T>) => void
}

export default function InputField<T extends `${EInputType}`>({ name, type, value, onUpdate }: InputFieldProps<T>) {
  switch (type) {
    case EInputType.NUMBER:
      return <InputFieldGeneric<T> inputAttrs={{ type: 'number' }} {...{ type, name, value, onUpdate }} />
    case EInputType.STRING:
      return (
        <InputFieldGeneric<T> inputAttrs={{ type: 'text' }} type={type} name={name} value={value} onUpdate={onUpdate} />
      )
    case EInputType.DATE:
      return <InputFieldGeneric<T> inputAttrs={{ type: 'datetime-local' }} {...{ type, name, value, onUpdate }} />
    case EInputType.ORDER_DETAILS:
      return <InputFieldOrderDetails {...({ name, value, onUpdate } as InputFieldOrderDetailsProps)} />
    default:
      return (
        <InputFieldGeneric<T>
          inputAttrs={{ type: 'text', disabled: true }}
          {...{ type, value, onUpdate }}
          name={`Unknown type: ${name}`}
        />
      )
  }
}

type InputFieldOrderDetailsProps = Omit<InputFieldProps<EInputType.ORDER_DETAILS>, 'type'>

function InputFieldOrderDetails({ name, value, onUpdate }: InputFieldOrderDetailsProps) {
  const orderDetails = useRef(value)

  const inputClass = 'input input-bordered input-sm'

  return (
    <label className="input-group input-group-sm input-group-vertical">
      <span>{name}</span>
      <div className="bg-base-100 form-control gap-y-1 p-2">
        <InputFieldGeneric<EInputType.STRING>
          inputAttrs={{ type: 'text', className: inputClass }}
          name="Ticker"
          type={EInputType.STRING}
          value={orderDetails.current.ticker}
          onUpdate={(value) => {
            orderDetails.current.ticker = value
            onUpdate(orderDetails.current)
          }}
        />
        <label className="!input-group">
          <span className="label-text">Operation</span>
          <select
            defaultValue={orderDetails.current.operation}
            className="select select-sm select-bordered"
            onChange={(e) => {
              orderDetails.current.operation = e.target.value as OperationType
              onUpdate(orderDetails.current)
            }}
          >
            {Object.values(EOperationType).map((operation) => (
              <option key={operation} value={operation}>
                {operation}
              </option>
            ))}
          </select>
        </label>
        <InputFieldGeneric<EInputType.NUMBER>
          inputAttrs={{ type: 'number', className: inputClass }}
          name="Price"
          type={EInputType.NUMBER}
          value={orderDetails.current.price}
          onUpdate={(value) => {
            orderDetails.current.price = value
            onUpdate(orderDetails.current)
          }}
        />
        <InputFieldGeneric<EInputType.NUMBER>
          inputAttrs={{ type: 'number', className: inputClass }}
          name="Lots"
          type={EInputType.NUMBER}
          value={orderDetails.current.lots}
          onUpdate={(value) => {
            orderDetails.current.lots = value
            onUpdate(orderDetails.current)
          }}
        />
      </div>
    </label>
  )
}

function InputFieldGeneric<T extends `${EInputType}`>({
  name,
  type,
  value,
  onUpdate,
  inputAttrs
}: InputFieldProps<T> & { inputAttrs?: InputHTMLAttributes<HTMLInputElement> }) {
  function valueToString(value: TypeFromInputType<T>) {
    if (type === EInputType.DATE) return (value as Date).toISOString().slice(0, -1)
    return String(value)
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (type === EInputType.STRING) return onUpdate(e.target.value as TypeFromInputType<T>)
    if (type === EInputType.NUMBER) return onUpdate(Number(e.target.value) as TypeFromInputType<T>)
    if (type === EInputType.DATE) return onUpdate(new Date(e.target.value) as TypeFromInputType<T>)
    console.error(new Error(`Unsupported type: ${type}`))
  }

  return (
    <label className="!input-group">
      <span className="label-text">{name}</span>
      <input
        className="input input-bordered"
        placeholder={name}
        defaultValue={valueToString(value)}
        onChange={onChange}
        {...inputAttrs}
      />
    </label>
  )
}
