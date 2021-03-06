import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styled from '@emotion/styled';
import { Banner, theme } from '@gdsc-uos-recruit-page/design-system';

import { TeamKeyType } from '../../../@types/team';
import { QuestionListItem } from '../../../@types/question';
import { Introduction } from '../../components/common';
import { TeamList } from '../../components/Qna';
import QuestionList from '../../components/Qna/QuestionList';
import { QuestionContent } from '../../constants/';
import { TitleOneDesc } from '../../../@types';
import { getQuestion } from '../../utils';

interface Params extends ParsedUrlQuery {
  teamName: TeamKeyType;
}

interface QnaListPageProps {
  questions: QuestionListItem[];
  teamName: TeamKeyType;
}

const QnaListPage: NextPage<QnaListPageProps> = ({ questions, teamName }) => {
  return (
    <>
      <Layout>
        <Banner />
        <IntroductionWrapper>
          <Introduction
            title='자주 묻는 질문'
            desc='GDSC UOS에 대해 궁금하시면 질문을 확인해 주세요.'
          />
        </IntroductionWrapper>
        <ContentsWrapper>
          <TeamList teamName={teamName} />
          <QuestionList questions={questions} />
        </ContentsWrapper>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { teamName: 'common' } },
      { params: { teamName: 'frontend' } },
      { params: { teamName: 'backend' } },
      { params: { teamName: 'mobile' } },
      { params: { teamName: 'data_ml' } },
    ],
    fallback: false, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const questions = getQuestion(params!.teamName as string);

  return {
    props: {
      questions,
      teamName: params!.teamName,
    },
  };
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
`;

const IntroductionWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ContentsWrapper = styled.div`
  width: 80%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  @media (max-width: ${theme.size.mobile}px) {
    flex-direction: column-reverse;
  }
`;

export default QnaListPage;
