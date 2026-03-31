import BlogIcon from '@/assets/icons/blog.png'
import InstagramIcon from '@/assets/icons/instagram.png'
import KakaoIcon from '@/assets/icons/kakao.png'
import YoutubeIcon from '@/assets/icons/youtube.png'
import Logo from '@/assets/images/logo-white.png'

function Footer() {
  return (
    <footer className="text-text-footer w-full bg-[#222222] px-90 py-20">
      <section className="border-text-chatbot border-b pb-10">
        <div className="mb-10">
          <img src={Logo} alt="" />
        </div>
        <ul className="flex flex-col gap-6 text-[18px]">
          <li>초격차캠프</li>
          <li>사업개발캠프</li>
          <li>프로덕트 디자이너 캠프</li>
        </ul>
      </section>
      <section className="mt-10 flex justify-between">
        <div>
          <ul className="flex gap-7 underline">
            <li>개인정보처리방침</li>
            <li>이용약관</li>
            <li>멘토링&강사지원</li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-3">
            <li>
              <img src={KakaoIcon} alt="" />
            </li>
            <li>
              <img src={BlogIcon} alt="" />
            </li>
            <li>
              <img src={YoutubeIcon} alt="" />
            </li>
            <li>
              <img src={InstagramIcon} alt="" />
            </li>
          </ul>
        </div>
      </section>
      <address className="text-text-light mt-10 not-italic">
        <p>
          대표자 : 이한별 | 사업자 등록번호 : 540-86-00384 | 통신판매업 신고번호
          : 2020-경기김포-3725호
        </p>
        <p>
          주소 : 경기도 김포시 사우중로 87 201호 | 이메일 :
          <a href="mailto:kdigital@nextrunners.co.kr" className="">
            kdigital@nextrunners.co.kr
          </a>
          {' | '}전화 :
          <a href="tel:07040998219" className="ml-1">
            070-4099-8219
          </a>
        </p>
      </address>
    </footer>
  )
}

export default Footer
