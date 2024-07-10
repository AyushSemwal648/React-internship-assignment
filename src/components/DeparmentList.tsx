import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface Department {
  id: number;
  name: string;
  subDepartments?: Department[];
}

const departments: Department[] = [
  {
    id: 1,
    name: 'Department A',
    subDepartments: [
      { id: 2, name: 'SubDepartment A1' },
      { id: 3, name: 'SubDepartment A2' },
    ],
  },
  {
    id: 4,
    name: 'Department B',
    subDepartments: [
      { id: 5, name: 'SubDepartment B1' },
      { id: 6, name: 'SubDepartment B2' },
    ],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (id: number) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (id: number, subDepartments?: Department[]) => {
    const updatedSelected = { ...selected, [id]: !selected[id] };
    if (subDepartments) {
      subDepartments.forEach((subDept) => {
        updatedSelected[subDept.id] = !selected[id];
      });
    }
    setSelected(updatedSelected);
  };

  return (
    <List>
      {departments.map((dept) => (
        <div key={dept.id}>
          <ListItem button onClick={() => handleToggle(dept.id)}>
            <ListItemIcon>
              <Checkbox
                checked={selected[dept.id] || false}
                onChange={() => handleSelect(dept.id, dept.subDepartments)}
              />
            </ListItemIcon>
            <ListItemText primary={dept.name} />
            {open[dept.id] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[dept.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.subDepartments?.map((subDept) => (
                <ListItem key={subDept.id} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={selected[subDept.id] || false}
                      onChange={() => handleSelect(subDept.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
