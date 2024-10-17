import React, { useState, useRef, useEffect } from 'react';

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!isDragging) {
      setIsModalOpen(false);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const modal = modalRef.current;
    const newLeft = e.clientX - offset.x;
    const newTop = e.clientY - offset.y;

    // 창 크기와 모달 크기를 계산하여 화면 밖으로 벗어나지 않도록 제한
    const maxLeft = window.innerWidth - modal.offsetWidth;
    const maxTop = window.innerHeight - modal.offsetHeight;
    const clampedLeft = Math.max(0, Math.min(newLeft, maxLeft));
    const clampedTop = Math.max(0, Math.min(newTop, maxTop));

    modal.style.left = `${clampedLeft}px`;
    modal.style.top = `${clampedTop}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const modal = modalRef.current;
      const left = (window.innerWidth - modal.offsetWidth) / 2;
      const top = (window.innerHeight - modal.offsetHeight) / 2;
      modal.style.left = `${left}px`;
      modal.style.top = `${top}px`;
    }
  }, [isModalOpen]);

  return (
    <>
      <button onClick={openModal} className='modal'>모달 열기</button>
      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div
            ref={modalRef}
            className='modal-content'
            onClick={(e) => e.stopPropagation()} // 모달 전체 클릭 시 닫히지 않도록 설정
          >
            {/* 모달 상단 헤더 (여기서만 드래그 가능) */}
            <div
              className='modal-header'
              onMouseDown={handleMouseDown}
              onClick={(e) => e.stopPropagation()} // 헤더 클릭 시 닫힘 방지
            >
              <span>선택된 기사의 요약이에요!</span>
              <button className='close-button' onClick={closeModal}>&times;</button>
            </div>
            {/* 모달 본문 내용 (여기서는 드래그 불가) */}
            <div className='modal-body' onClick={(e) => e.stopPropagation()}>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
              <p>모달 안의 본문 내용입니다.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
