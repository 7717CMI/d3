'use client'

import { useState } from 'react'

interface DistributorIntelligenceTableProps {
  title?: string
  height?: number
}

interface TableSection {
  name: string
  bgColor: string
  textColor: string
  columns: { key: string; label: string }[]
}

const TABLE_SECTIONS: TableSection[] = [
  {
    name: 'COMPANY INFORMATION',
    bgColor: 'bg-green-100',
    textColor: 'text-green-900',
    columns: [
      { key: 'company_name', label: 'Company Name' },
      { key: 'year_established', label: 'Year Established' },
      { key: 'headquarters', label: 'Headquarters' },
      { key: 'num_employees', label: 'No. of Employees (est.) if available' },
      { key: 'revenue', label: 'Revenue/Turnover (if available)' },
      { key: 'distribution_scale', label: 'Distribution Scale (Local / Regional / National / International)' },
    ]
  },
  {
    name: 'CONTACT DETAILS',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-900',
    columns: [
      { key: 'key_contact', label: 'Key Contact Person' },
      { key: 'designation', label: 'Designation / Role' },
      { key: 'email', label: 'Email Address (verified / generic)' },
      { key: 'phone', label: 'Phone / WhatsApp Number' },
      { key: 'linkedin', label: 'LinkedIn Profile' },
      { key: 'website', label: 'Website URL' },
    ]
  },
  {
    name: 'PRODUCT REQUIRED',
    bgColor: 'bg-cyan-100',
    textColor: 'text-cyan-900',
    columns: [
      { key: 'supplement_category', label: 'Vegan D3 Finished Supplement Category Handled' },
      { key: 'dosage_forms', label: 'Dosage Forms Handled' },
      { key: 'target_consumer', label: 'Target Consumer Segment Served' },
      { key: 'price_positioning', label: 'Price Positioning (Mass / Mid / Premium)' },
      { key: 'packaging_preference', label: 'Packaging Preference' },
    ]
  },
  {
    name: 'DISTRIBUTION CAPABILITY',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-900',
    columns: [
      { key: 'sales_channel', label: 'Sales Channel Strength' },
      { key: 'retail_network', label: 'Key Retail / Pharmacy Network Covered' },
      { key: 'import_capability', label: 'Import Capability' },
    ]
  }
]

const PLACEHOLDER = 'xx'

// Generate placeholder rows
function generatePlaceholderRows(count: number) {
  const allColumns = TABLE_SECTIONS.flatMap(s => s.columns)
  return Array.from({ length: count }, (_, i) => {
    const row: Record<string, string> = { id: String(i + 1) }
    allColumns.forEach(col => {
      row[col.key] = PLACEHOLDER
    })
    return row
  })
}

export default function DistributorIntelligenceTable({ title = 'Distributor Intelligence Database', height = 600 }: DistributorIntelligenceTableProps) {
  const [rows] = useState(() => generatePlaceholderRows(15))
  const allColumns = TABLE_SECTIONS.flatMap(s => s.columns)
  const totalCols = allColumns.length + 1 // +1 for company name row header

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="overflow-x-auto" style={{ maxHeight: height }}>
          <table className="min-w-full border-collapse text-sm">
            {/* Section Header Row */}
            <thead className="sticky top-0 z-20">
              <tr>
                {/* Empty cell for the row number / company name col */}
                <th
                  rowSpan={2}
                  className="border border-gray-300 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 text-center sticky left-0 z-30 min-w-[120px]"
                >
                  Company Name
                </th>
                {TABLE_SECTIONS.map((section) => (
                  <th
                    key={section.name}
                    colSpan={section.name === 'COMPANY INFORMATION' ? section.columns.length - 1 : section.columns.length}
                    className={`border border-gray-300 ${section.bgColor} px-3 py-2 text-xs font-bold ${section.textColor} text-center uppercase tracking-wide`}
                  >
                    {section.name}
                  </th>
                ))}
              </tr>
              {/* Column Header Row */}
              <tr>
                {TABLE_SECTIONS.map((section) => {
                  const cols = section.name === 'COMPANY INFORMATION'
                    ? section.columns.filter(c => c.key !== 'company_name')
                    : section.columns
                  return cols.map((col) => (
                    <th
                      key={col.key}
                      className={`border border-gray-300 ${section.bgColor} bg-opacity-60 px-3 py-2 text-[11px] font-semibold text-gray-700 text-center min-w-[140px] whitespace-normal`}
                    >
                      {col.label}
                    </th>
                  ))
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                >
                  {/* Sticky Company Name Column */}
                  <td className={`border border-gray-300 px-3 py-3 font-semibold text-gray-800 text-center sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
                    Customer {row.id}
                  </td>
                  {TABLE_SECTIONS.map((section) => {
                    const cols = section.name === 'COMPANY INFORMATION'
                      ? section.columns.filter(c => c.key !== 'company_name')
                      : section.columns
                    return cols.map((col) => (
                      <td
                        key={col.key}
                        className="border border-gray-300 px-3 py-3 text-gray-500 text-center"
                      >
                        {row[col.key]}
                      </td>
                    ))
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Data shown as placeholders (xx). Actual distributor data will be populated upon availability.</span>
      </div>
    </div>
  )
}
