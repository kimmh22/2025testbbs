import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import supabase from '../../utils/supabase';
import dayjs from 'dayjs';

function ViewComp() {
  const { id } = useParams(); // { id: "10" }
  const [view, setView] = useState({});

  useEffect(() => {
    const viewData = async () => {
      const { data, error } = await supabase
        .from('image_bbs')
        .select('*')
        .eq('id', Number(id))
        .single();

      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
      setView(data);
    };

    viewData();
  }, [id]); // id 바뀌면 다시 호출되도록

  return (
    <div>
      <h3>글보기</h3>
      <hr />
      <div>
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <h4>{view.title}</h4>

          <div>
            {view.name} /{' '}
            {view.created_at
              ? dayjs(view.created_at).format('YY.MM.DD HH:mm')
              : ''}
          </div>
        </div>
        <hr />

        {/* ✅ 이미지 영역 추가 */}
        {view.fileurl && (
          <div className="mb-3">
            <img
              src={view.fileurl} // 🔴 여기를 실제 컬럼명에 맞게 수정!
              alt={view.title}
              style={{
                maxWidth: '400px',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        <p style={{ minHeight: '200px' }}>{view.content}</p>
      </div>

      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          {/* 이미지 게시판이면 경로도 imageboard로 바꾸는 게 더 자연스러움 */}
          <Link to="/imageboard/list" className="btn btn-primary">
            리스트
          </Link>
          <Link to={`/imageboard/modify/${id}`} className="btn btn-info">
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
