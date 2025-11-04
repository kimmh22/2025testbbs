import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../../utils/supabase';
import dayjs from 'dayjs';

function ViewComp() {
  const { id } = useParams();
  const [view, setView] = useState({});

  useEffect(() => {
    const viewData = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', Number(id))
        .single();

      console.log(data);
      setView(data);
    };
    viewData();
  }, []);

  return (
    <div>
      <h3>글보기</h3>
      <hr />
      <div>
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <h4>{view.title}</h4>
          <div>
            {view.name} / {dayjs(view.created_at).format('YY.MM.DD hh:mm')}
          </div>
        </div>
        <hr />
        <p style={{ 'min-height': '200px' }}>{view.content}</p>
      </div>
      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          <Link to="/board/list" className="btn btn-primary">
            리스트
          </Link>
          <Link to="/board/modi" className="btn btn-info">
            수정
          </Link>
          <Link to="" className="btn btn-danger">
            삭제
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewComp;
