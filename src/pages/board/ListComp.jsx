import { useState, useEffect } from 'react';
import supabase from '../../utils/supabase';

import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useBoard } from '../../context/BoardContext';

function ListComp() {
  const { posts } = useBoard();
  if (!posts.length) {
    return <p>게시물이 없습니다.</p>;
  }
  return (
    <div>
      <h3>리스트</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: '30px' }}>
              no
            </th>
            <th scope="col" style={{ width: '60%' }}>
              subject
            </th>
            <th scope="col">name</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((item, i) => {
            return (
              <tr key={i}>
                <th scope="row">{posts.length - i}</th>
                <td>
                  <Link to={`/board/view/${item.id}`} className="nav-link">
                    {item.title}
                  </Link>
                </td>
                <td>{item.name}</td>
                <td>{dayjs(item.created_at).format('YY.MM.DD')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <ul>
        {posts.map((item, i) => (
          <li key={i}>
            {post.title} / {post.name} / {post.content} /
            {dayjs(post.created_at).format('YYYY-MM-DD')}
          </li>
        ))}
      </ul> */}

      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          <Link to="/board/write" className="btn btn-primary">
            글작성
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ListComp;
