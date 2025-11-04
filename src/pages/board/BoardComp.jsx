import React, { useEffect, useState } from 'react';
import ListComp from './ListComp';
import WriteComp from './WriteComp';
import ViewComp from './ViewComp';
import ModifyComp from './ModiComp';
import { Link, Route, Routes } from 'react-router-dom';
import { BoardProvider } from '../../context/BoardContext';

function BoardComp() {
  return (
    <BoardProvider>
      <div className="container">
        <div
          style={{ width: '100%', height: '200px' }}
          className="d-flex justify-content-center align-items-center bg-info rounded mb-3"
        >
          Board
        </div>

        <div className="d-flex justify-content-center gap-3">
          <Link to="../board/list" className="nav-link">
            글리스트
          </Link>
          <Link to="../board/write" className="nav-link">
            글작성
          </Link>
        </div>
        <Routes>
          <Route index element={<ListComp />}></Route>
          <Route path="list" element={<ListComp />}></Route>
          <Route path="write" element={<WriteComp />}></Route>
          <Route path="view/:id" element={<ViewComp />}></Route>
          {/* <Route path="view" element={<ViewComp />}></Route> */}
          <Route path="modify/:id" element={<ModifyComp />}></Route>
        </Routes>
      </div>
    </BoardProvider>
  );
}

export default BoardComp;
