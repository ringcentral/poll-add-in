export default function Detail (props) {
  const { item } = props
  const all = (item.options || []).reduce((p, k) => {
    return p + (k.count || 0)
  }, 0)
  function renderPercent (opt) {
    if (item.multi) {
      return ''
    }
    const p = Math.floor(opt.count * 100 / all)
    return `, ${p}%`
  }
  function renderOpt (opt) {
    return (
      <li key={opt.id}>
        <span>{opt.title}</span>
        <span className='mg1l'>
          ({opt.count}{renderPercent(opt)})
        </span>
      </li>
    )
  }
  return (
    <div className='pd1'>
      <h2>{item.title}</h2>
      <p>{item.desc}</p>
      <ol>
        {
          (item.options || []).map(renderOpt)
        }
      </ol>
    </div>
  )
}
