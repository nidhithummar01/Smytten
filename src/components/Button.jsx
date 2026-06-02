import { useState } from 'react';

/**
 * variants: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
 * sizes:    'sm' | 'md' | 'lg'
 */
const variants = {
  primary: {
    base:   { background:'#4338CA', color:'#fff', border:'none', boxShadow:'0 1px 3px rgba(67,56,202,0.25), 0 4px 12px rgba(67,56,202,0.2)' },
    hover:  { background:'#3730A3', boxShadow:'0 2px 6px rgba(67,56,202,0.3), 0 6px 20px rgba(67,56,202,0.25)' },
    active: { background:'#312E81', boxShadow:'0 1px 2px rgba(67,56,202,0.2)', transform:'translateY(1px) scale(0.98)' },
  },
  secondary: {
    base:   { background:'#fff', color:'#334155', border:'1px solid #CBD5E1', boxShadow:'0 1px 3px rgba(15,23,42,0.06)' },
    hover:  { background:'#F8FAFC', borderColor:'#94A3B8', boxShadow:'0 2px 6px rgba(15,23,42,0.08)' },
    active: { background:'#F1F5F9', boxShadow:'none', transform:'translateY(1px) scale(0.98)' },
  },
  ghost: {
    base:   { background:'transparent', color:'#475569', border:'1px solid transparent', boxShadow:'none' },
    hover:  { background:'#F1F5F9', borderColor:'#E2E8F0', boxShadow:'none' },
    active: { background:'#E2E8F0', transform:'scale(0.97)' },
  },
  danger: {
    base:   { background:'#FEF2F2', color:'#DC2626', border:'1px solid #FECACA', boxShadow:'none' },
    hover:  { background:'#DC2626', color:'#fff', borderColor:'#DC2626', boxShadow:'0 4px 12px rgba(220,38,38,0.25)' },
    active: { background:'#B91C1C', transform:'translateY(1px) scale(0.98)' },
  },
  success: {
    base:   { background:'#ECFDF5', color:'#059669', border:'1px solid #A7F3D0', boxShadow:'none' },
    hover:  { background:'#059669', color:'#fff', borderColor:'#059669', boxShadow:'0 4px 12px rgba(5,150,105,0.25)' },
    active: { background:'#047857', transform:'translateY(1px) scale(0.98)' },
  },
  icon: {
    base:   { background:'#fff', color:'#475569', border:'1px solid #E2E8F0', boxShadow:'0 1px 2px rgba(15,23,42,0.04)' },
    hover:  { background:'#F1F5F9', borderColor:'#CBD5E1', color:'#0F172A', boxShadow:'0 2px 6px rgba(15,23,42,0.08)' },
    active: { background:'#E2E8F0', transform:'scale(0.95)' },
  },
};

const sizes = {
  sm: { padding:'5px 12px', fontSize:11, borderRadius:7, gap:5, iconSize:13 },
  md: { padding:'7px 16px', fontSize:13, borderRadius:8, gap:6, iconSize:14 },
  lg: { padding:'10px 20px',fontSize:14, borderRadius:10, gap:7, iconSize:16 },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight,
  disabled = false,
  onClick,
  style: extraStyle,
  fullWidth,
  title,
}) {
  const [hov, setHov] = useState(false);
  const [act, setAct] = useState(false);

  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  const computed = {
    ...v.base,
    ...(hov && !disabled ? v.hover : {}),
    ...(act && !disabled ? v.active : {}),
  };

  return (
    <button
      onClick={!disabled ? onClick : undefined}
      title={title}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => { setHov(false); setAct(false); }}
      onMouseDown={() => !disabled && setAct(true)}
      onMouseUp={() => setAct(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 600,
        fontFamily: 'inherit',
        borderRadius: s.borderRadius,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background 0.15s, box-shadow 0.15s, border-color 0.15s, color 0.15s, transform 0.1s',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        width: fullWidth ? '100%' : undefined,
        lineHeight: 1,
        ...computed,
        ...extraStyle,
      }}
    >
      {Icon && !iconRight && <Icon size={s.iconSize} />}
      {children}
      {Icon && iconRight && <Icon size={s.iconSize} />}
    </button>
  );
}
