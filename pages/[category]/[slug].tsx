import Layout from "component/Layout";
import Sidebar from "component/Sidebar";
import { getDetailPages, getSlugPageData } from "lib/data";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Disqus from "component/Disqus";
type Props = {};

const DetailPage = ({ pageData }) => {
    const DynamicCupDynamic = dynamic(() => import("component/CupAd"));
    const { ContentID, ContentTitle, ContentMemo, CategoryName, OsType, ApprovalRate, LImage, SImage } = pageData;

    return (
        <Layout>
            <Head>
                <title>{ContentTitle}</title>
                <meta name="description" content={ContentMemo} />
                <meta property="og:site_name" content={"텐픽"} />
                <meta property="og:type" content={"article"} />
                <meta property="og:title" content={ContentTitle} />
                <meta property="og:url" content={pageData.Link} />
                <meta property="og:image" content={pageData.Images.size1024x500} />
                <meta property="og:description" content={ContentMemo} />
                <meta property="og:locale" content="ko_KR" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </Head>
            <article className="DetailPage">
                <div className="badge_box">
                    <span className="badge">{CategoryName}</span>
                    <span className="badge">
                        {OsType === "Both" ? "안드로이드&IOS" : OsType === "And" ? "안드로이드" : "IOS"}
                    </span>
                    {ApprovalRate === "최상" ? (
                        <span className="badge">BEST</span>
                    ) : ApprovalRate === "상" ? (
                        <span className="badge">HOT</span>
                    ) : (
                        ""
                    )}
                </div>
                <div className="page_head">
                    <h2> {pageData.ContentTitle}</h2>

                    <div className="page_sub">
                        원문보기 :{" "}
                        <a target="_blank" href={pageData.Link}>
                            {pageData.Link}
                        </a>
                    </div>
                </div>
                <DynamicCupDynamic />
                <div
                    className="page_banner"
                    style={{ backgroundImage: `url('${pageData.Images.size1024x500 || pageData.LImage}')` }}
                ></div>
                <div className="page_article">
                    <p>안녕하세요! </p>
                    <p>
                        도움이되는 소식을 빠르고 또 빠르게 가져다드리는 <b>텐픽</b>입니다
                    </p>
                    <p>
                        오늘은 <b>{pageData.ContentTitle}</b>을 소개합니다!
                    </p>
                    <p>
                        <br />
                    </p>
                    {pageData.ContentMemo.split("\n").map((it, idx) => (
                        <p key={`contentmemo:${idx}`}>{it}</p>
                    ))}
                    <p>
                        <b>아래 버튼을 눌러 더 자세한 내용을 확인하세요!</b>
                    </p>
                </div>
                <a target="_blank" href={pageData.Link}>
                    <div className="promote_btn">더 자세히 알아보기</div>
                </a>

                <div className="page_slide">
                    {Object.values(pageData.Images).map((it: string, idx: number) => (
                        <div key={`slideimg:${idx}`}>
                            <img src={it} alt={it} />
                        </div>
                    ))}
                </div>
                <DynamicCupDynamic />
                <Disqus />
            </article>
        </Layout>
    );
};
export async function getStaticProps({ params }) {
    const { category, slug } = params;
    const pageData = getSlugPageData(category, slug);
    // const id = params.id.split("-")[1];
    // const data = getItemListByCategory();
    return {
        props: {
            pageData,
        },
    };
}
export async function getStaticPaths() {
    const paths = getDetailPages();
    return { paths, fallback: false };
}
export default DetailPage;
