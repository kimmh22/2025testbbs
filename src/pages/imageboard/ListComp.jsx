import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useImgBoard } from '../../context/ImgBoardContext';

function ListComp() {
  const { posts } = useImgBoard();

  if (!posts.length) {
    return <p>게시물이 없습니다.</p>;
  }

  return (
    <div>
      <h3>이미지 게시판</h3>

      {/* 카드 전체를 감싸는 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {posts.map((item, i) => (
          <div
            key={i}
            className="card shadow-sm"
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {/* 이미지 */}
            <Link to={`/imageboard/view/${item.id}`}>
              <img
                src={item.fileurl}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                }}
              />
            </Link>

            {/* 카드 내용 */}
            <div style={{ padding: '15px' }}>
              <h5 style={{ marginBottom: '8px' }}>{item.title}</h5>
              <div style={{ fontSize: '13px', color: '#555' }}>
                {dayjs(item.created_at).format('YY.MM.DD')}
              </div>
              <div style={{ fontSize: '14px', marginTop: '5px' }}>
                작성자: {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 글작성 버튼 */}
      <div className="d-flex justify-content-end mt-4">
        <Link to="/imageboard/write" className="btn btn-primary">
          글작성
        </Link>
      </div>
    </div>
  );
}

export default ListComp;
