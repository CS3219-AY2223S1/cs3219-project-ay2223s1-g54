import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Link,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import Navbar from "../Navbar";
import QuestionPane from "../QuestionPane";
import BaseLayout from "../layouts/BaseLayout";
import { URL_QUESTION_SVC_GET_ALL_QUESTION } from "../../configs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const QuestionBankPage = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [questionBank, setQuestionBank] = useState([]);
  const [questionSearchQuery, setQuestionSearchQuery] = useState("");
  const [questionSearchResult, setQuestionSearchResult] = useState([]);
  const [questionObject, setQuestionObject] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getQuestionBank = async () => {
      const response = await axiosPrivate.get(
        URL_QUESTION_SVC_GET_ALL_QUESTION
      );
      const { questions } = response.data;

      setQuestionBank(questions);
      setIsInitializing(false);
    };

    getQuestionBank();
  }, []);

  useEffect(() => {
    const searchResult = questionBank.filter((question) => {
      return (
        question.title.includes(questionSearchQuery) ||
        question.id.includes(questionSearchQuery)
      );
    });
    setQuestionSearchResult(searchResult);
  }, [questionSearchQuery]);

  const handleQuestionSearch = (event) => {
    setQuestionSearchQuery(event.target.value);
  };

  return (
    <BaseLayout>
      <Navbar>
        <Link color="blue.400" as={RouterLink} to="/home">
          Back to Home
        </Link>
      </Navbar>
      {isInitializing ? (
        <Flex
          w="100%"
          h="full"
          alignItems="center"
          justifyContent="center"
          bg="#ffffff"
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <ReflexContainer orientation="vertical">
          <ReflexElement style={{ overflow: "hidden" }}>
            <Box w="100%" h="full" minH="full" maxH="full" bg="#ffffff">
              {Object.keys(questionObject).length > 0 ? (
                <QuestionPane questionData={questionObject} />
              ) : (
                <Flex
                  w="100%"
                  h="full"
                  alignItems="center"
                  justifyContent="center"
                  bg="#ffffff"
                >
                  <Text>Please select a question</Text>
                </Flex>
              )}
            </Box>
          </ReflexElement>
          <ReflexSplitter
            style={{ width: "5px", backgroundColor: "#39424e" }}
          />
          <ReflexElement style={{ overflow: "hidden" }}>
            <Box h="full" minH="full" maxH="full" bg="#ffffff">
              <Flex
                direction="column"
                h="full"
                minH="full"
                maxH="full"
                p="10"
                pb="100"
              >
                <Input
                  mb="5"
                  placeholder="Enter question details"
                  onChange={handleQuestionSearch}
                ></Input>
                <Box overflow="scroll">
                  <UnorderedList>
                    {questionSearchResult.map((questionObject) => {
                      return (
                        <ListItem key={questionObject.id}>
                          <Link
                            onClick={() => setQuestionObject(questionObject)}
                          >
                            {questionObject.title} [{questionObject.id}]
                          </Link>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </Box>
              </Flex>
            </Box>
          </ReflexElement>
        </ReflexContainer>
      )}
    </BaseLayout>
  );
};

export default QuestionBankPage;
