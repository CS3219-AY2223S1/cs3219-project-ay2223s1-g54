import requests
import json

class Crawler:
    BASE_URL = "https://leetcode.com"
    GRAPHQL_URL = f"{BASE_URL}/graphql"
    ALGO_INTERNAL_URL = f"{BASE_URL}/api/problems/algorithms/"
    USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15"
    
    def __init__(self):
        self.session = requests.Session()
        response = self.session.get(self.BASE_URL)
        
        for cookie in response.cookies:
            if cookie.name == "csrftoken":
                self.csrftoken = cookie.value
                return
        raise Exception("Unable to retrieve CSRF token")


    def fetch_all_question_title_slugs(self):
        response = self.session.get(self.ALGO_INTERNAL_URL)
        response_json = response.json()

        question_title_slugs = []
        for entry in response_json["stat_status_pairs"]:
            question_title_slugs.append(entry["stat"]["question__title_slug"])
        return question_title_slugs
    

    def fetch_question(self, question_title_slug):
        headers = {
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "User-Agent": self.USER_AGENT,
            "Referer": f"https://leetcode.com/problems/{question_title_slug}"
        }

        payload = {
            "operationName": "questionData",
            "variables": {
                "titleSlug": question_title_slug
            },
            "query": '''query questionData($titleSlug: String!) {
                question(titleSlug: $titleSlug) {
                    questionId
                    questionFrontendId
                    boundTopicId
                    title
                    titleSlug
                    content
                    translatedTitle
                    translatedContent
                    isPaidOnly
                    difficulty
                    likes
                    dislikes
                    isLiked
                    similarQuestions
                    exampleTestcases
                    categoryTitle
                    contributors {
                        username
                        profileUrl
                        avatarUrl
                        __typename
                    }
                    topicTags {
                        name
                        slug
                        translatedName
                        __typename
                    }
                    companyTagStats
                    codeSnippets {
                        lang
                        langSlug
                        code
                        __typename
                    }
                    stats
                    hints
                    solution {
                        id
                        canSeeDetail
                        paidOnly
                        hasVideoSolution
                        paidOnlyVideo
                        __typename
                    }
                    status
                    sampleTestCase
                    metaData
                    judgerAvailable
                    judgeType
                    mysqlSchemas
                    enableRunCode
                    enableTestMode
                    enableDebugger
                    envInfo
                    libraryUrl
                    adminUrl
                    challengeQuestion {
                        id
                        date
                        incompleteChallengeCount
                        streakCount
                        type
                        __typename
                    }
                    __typename
                }
            }'''
        }

        data = json.dumps(payload).encode("utf8")
        response = self.session.post(self.GRAPHQL_URL, data=data, headers=headers, timeout=10)
        if response.status_code != 200:
            raise Exception(f"Unable to fetch {question_title_slug} content")
        response_json = response.json()
        question_object = response_json["data"]["question"]

        if question_object["isPaidOnly"]:
            return None


        topicTags = [] 
        for topicTag in question_object["topicTags"]:
            topicTags.append({ "name": topicTag["name"], "slug": topicTag["slug"] })

        codeSnippets = [] 
        for codeSnippet in question_object["codeSnippets"]:
            codeSnippets.append({ "name": codeSnippet["lang"], "slug": codeSnippet["langSlug"], "code": codeSnippet["code"] })

        return {
            "id": question_object["questionId"],
            "title": question_object["title"],
            "difficulty": question_object["difficulty"],
            "topicTags": topicTags,
            "content": question_object["content"],
            "codeSnippets": codeSnippets
        }


    def fetch_all_questions(self):
        question_objects = []

        question_title_slugs = self.fetch_all_question_title_slugs()

        for question_title_slug in question_title_slugs:
            question_object = self.fetch_question(question_title_slug)
            if question_object:
                print(f"Fetched {question_object['title']}.")
                question_objects.append(question_object)

        return question_objects
        

if __name__ == "__main__":
    crawler = Crawler()
    question_objects = crawler.fetch_all_questions()

    file = open("data.json", "w")
    file.write(json.dumps(question_objects))
