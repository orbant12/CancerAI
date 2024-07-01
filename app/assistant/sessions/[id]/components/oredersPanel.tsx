

import EnhancedTable, { HeadCell, RequestTableType } from "../components/table"


export const OrdersPanel = ({orders}:{orders:RequestTableType[]}) => {
 
  const headCells: readonly HeadCell[] = [
    {
        id: 'melanomaId',
        numeric: true,
        disablePadding: true,
        label: 'Mole ID',
    },
    {
      id: 'location',
      numeric: false,
      disablePadding: false,
      label: 'Location',
    },
    {
        id: 'ai_risk',
        numeric: false,
        disablePadding: false,
        label: 'AI Prediction',
    },
    {
      id: 'finished',
      numeric: false,
      disablePadding: false,
      label: 'State',
  },
  ];

    return(
        <div style={{marginTop:120}}>
          <EnhancedTable 
              rows={orders}
              handleAccept={() => console.log("Accepted")}
              headCells={headCells}
              type="mole"
              tableTitle='Orders'
          />
        </div>
    )

}







