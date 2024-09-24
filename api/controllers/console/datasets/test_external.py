from flask_restful import Resource, reqparse

from controllers.console import api
from controllers.console.setup import setup_required
from controllers.console.wraps import account_initialization_required
from libs.login import login_required
from services.external_knowledge_service import ExternalDatasetService


class TestExternalApi(Resource):
    @setup_required
    @login_required
    @account_initialization_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "top_k",
            nullable=False,
            required=True,
            type=int,
        )
        parser.add_argument(
            "score_threshold",
            nullable=False,
            required=True,
            type=float,
        )
        parser.add_argument(
            "query",
            nullable=False,
            required=True,
            type=str,
        )
        parser.add_argument(
            "external_knowledge_id",
            nullable=False,
            required=True,
            type=str,
        )
        args = parser.parse_args()
        result = ExternalDatasetService.test_external_knowledge_retrieval(
            args["top_k"], args["score_threshold"], args["query"], args["external_knowledge_id"]
        )
        return result, 200


api.add_resource(TestExternalApi, "/dify/external-knowledge/retrieval-documents")
