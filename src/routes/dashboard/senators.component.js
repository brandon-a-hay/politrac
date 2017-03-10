import React from 'react'
import './senators.scss'
import Flexbox from 'flexbox-react'
import { states } from '../../constants';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'Recharts'

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Senators = (props) => {
  return(
    <div>
      <Flexbox flexDirection="row">
        {props.senators.map(senator => (
          <div className="card" key={senator.name}>
            <div className="card-header">
              <img className="profile-image" src={'https://theunitedstates.io/images/congress/225x275/' + senator.id + '.jpg'} />
              <h1>{senator.name} ({senator.party})</h1>
              <h4>{senator.role} | Next election: {senator.next_election}</h4>
            </div>
            {senator.legislation.length === 0
              ? <p>No sponsored legislation :(</p>
              : <h4>Sponsored legislation</h4>
            }
            <Flexbox flexDirection="row" className="senator-focus">
              <PieChart width={100} height={100}>
                <Pie data={data} cx={"50%"} cy={"50%"}innerRadius={20} outerRadius={40} fill="#8884d8" paddingAngle={5}>
                  {
                    data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))
                  }
                </Pie>
              </PieChart>
              <div className="bill-categories">
                {senator.billCategories.map(category => (
                  <div key={category.name}>{category.name}: {category.value}</div>
                ))}
              </div>
            </Flexbox>
            {senator.legislation.map((bill, i) => (
                <a className="link" key={i} href={'bill/' + bill.congress + '/' + bill.number}>
                  <label>{bill.title}</label>
                </a>
              ))
            }
          </div>
        ))}
      </Flexbox>
    </div>
  )
}

export default Senators
