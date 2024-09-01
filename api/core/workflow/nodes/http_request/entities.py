from collections.abc import Sequence
from typing import Literal, Optional

from pydantic import BaseModel, Field, ValidationInfo, field_validator

from configs import dify_config
from core.workflow.entities.base_node_data_entities import BaseNodeData


class HttpRequestNodeAuthorizationConfig(BaseModel):
    type: Literal["basic", "bearer", "custom"]
    api_key: str
    header: str = ""


class HttpRequestNodeAuthorization(BaseModel):
    type: Literal["no-auth", "api-key"]
    config: Optional[HttpRequestNodeAuthorizationConfig] = None

    @field_validator("config", mode="before")
    @classmethod
    def check_config(cls, v: HttpRequestNodeAuthorizationConfig, values: ValidationInfo):
        """
        Check config, if type is no-auth, config should be None, otherwise it should be a dict.
        """
        if values.data["type"] == "no-auth":
            return None
        else:
            if not v or not isinstance(v, dict):
                raise ValueError("config should be a dict")

            return v


class BodyData(BaseModel):
    key: str
    type: Literal["file", "text"]
    value: str = ""
    file: Sequence[str] = Field(default_factory=list)


class HttpRequestNodeBody(BaseModel):
    type: Literal["none", "form-data", "x-www-form-urlencoded", "raw-text", "json", "binary"]
    data: Sequence[BodyData] = Field(default_factory=list)


class HttpRequestNodeTimeout(BaseModel):
    connect: int = dify_config.HTTP_REQUEST_MAX_CONNECT_TIMEOUT
    read: int = dify_config.HTTP_REQUEST_MAX_READ_TIMEOUT
    write: int = dify_config.HTTP_REQUEST_MAX_WRITE_TIMEOUT


class HttpRequestNodeData(BaseNodeData):
    """
    Code Node Data.
    """

    method: Literal["get", "post", "put", "patch", "delete", "head"]
    url: str
    authorization: HttpRequestNodeAuthorization
    headers: str
    params: str
    body: Optional[HttpRequestNodeBody] = None
    timeout: Optional[HttpRequestNodeTimeout] = None
