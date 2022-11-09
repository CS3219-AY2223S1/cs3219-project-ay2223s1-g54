import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Progress,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
} from "@chakra-ui/react";
import moment from "moment";
import {
  URL_QUESTION_SVC_GET_QUESTION_BY_ID,
  URL_HISTORY_SVC_USER_SUBMISSIONS,
} from "../configs";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const HistoryPane = () => {
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { userId } = auth;

  useEffect(() => {
    const getUserSubmissions = async () => {
      const submissionHistoryResponse = await axiosPrivate.get(
        `${URL_HISTORY_SVC_USER_SUBMISSIONS}/${userId}?number=10`
      );
      const { userSubmissionHistory } = submissionHistoryResponse.data;

      // add corresponding question titles within userSubmissionHistory object
      for (let i = 0; i < userSubmissionHistory.length; i++) {
        const questionObjectResponse = await axiosPrivate.get(
          URL_QUESTION_SVC_GET_QUESTION_BY_ID,
          { params: { id: userSubmissionHistory[i].questionId } }
        );
        userSubmissionHistory[i].title =
          questionObjectResponse.data.question.title;
      }

      setUserSubmissions(userSubmissionHistory);
      setIsLoadingSubmissions(false);
    };

    getUserSubmissions();
  }, []);

  const handleNavigateSubmission = async (submission) => {
    const { questionId, code } = submission;
    const response = await axiosPrivate.get(
      URL_QUESTION_SVC_GET_QUESTION_BY_ID,
      { params: { id: questionId } }
    );
    const { question } = response.data;
    navigate("/submissionViewer", { state: { question, code } });
  };

  return (
    <Stack spacing="4">
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Submitted At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoadingSubmissions ? (
              <Tr>
                <Td>
                  <Progress size="xs" isIndeterminate />
                </Td>
                <Td>
                  <Progress size="xs" isIndeterminate />
                </Td>
                <Td>
                  <Progress size="xs" isIndeterminate />
                </Td>
              </Tr>
            ) : userSubmissions.length === 0 ? (
              <Tr>
                <Td>NIL</Td>
                <Td>NIL</Td>
                <Td>NIL</Td>
              </Tr>
            ) : (
              userSubmissions.map((submission) => {
                return (
                  <Tr key={submission.id}>
                    <Td>{submission.questionId}</Td>
                    <Td>
                      <Link
                        onClick={() => handleNavigateSubmission(submission)}
                      >
                        {submission.title}
                      </Link>
                    </Td>
                    <Td>{moment(submission.createdAt).fromNow()}</Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default HistoryPane;
