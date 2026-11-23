"use client";


import styles from "@/app/coupon.module.css";

export default function StampCoupon({ stamps, setStamps }) {


  return (
    <section className={styles.coupon} aria-labelledby="coupon-title">
      <h2 id="coupon-title">커피 스탬프 쿠폰</h2>
      <p className={styles.description}>스탬프 10개를 모아보세요!</p>
      <ol className={styles.stamps} aria-label={`스탬프 10개 중 ${stamps}개 적립`}>
        {Array.from({ length: 10 }, (_, index) => (
          <li key={index} className={index < stamps ? styles.filled : styles.slot} aria-label={`${index + 1}번째 칸: ${index < stamps ? "적립 완료" : "비어 있음"}`}>
            <span aria-hidden="true">{index < stamps ? "☕" : index + 1}</span>
          </li>
        ))}
      </ol>
      <div className={styles.status} role="status" aria-live="polite" aria-atomic="true">
        <strong>{stamps} / 10</strong>
        {stamps === 10 ? (
          <><p>🎉 축하합니다!</p><p>무료 음료 1잔 쿠폰이 완성되었습니다!</p></>
        ) : (
          <p>{stamps === 0 ? "아직 스탬프가 없습니다" : `완성까지 ${10 - stamps}개 남았어요.`}</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" disabled={stamps === 0} onClick={() => setStamps(count => Math.max(0, count - 1))}>취소</button>
        <button type="button" className={styles.primary} disabled={stamps === 10} onClick={() => setStamps(count => Math.min(10, count + 1))}>찍기</button>
        <button type="button" disabled={stamps === 0} onClick={() => setStamps(0)}>초기화</button>
      </div>
    </section>
  );
}
