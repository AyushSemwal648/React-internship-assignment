import  { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import DepartmentList from '../components/DeparmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'body', headerName: 'Body', width: 300 },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={posts} columns={columns} pageSizeOptions={[5, 10, 20]} initialState={{ pagination: { paginationModel: { pageSize: 5 }}}} />
      </div>
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
