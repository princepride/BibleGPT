
# BibleGPT

BibleGPT是一个基于圣经和先进自然语言处理技术的灵修辅助应用。它采用了多项前沿的AI和信息检索技术,旨在为用户提供更智能、更准确、更有针对性的圣经阅读和心灵引导体验。

## 核心技术

* 使用4bit量化版的zephyr-7B-β(Mistral-7B fine-tune))语言模型,在保证推理速度的同时最大限度保留模型性能
* nlp_bert_document-segmentation算法用于自适应划分圣经章节段落,提高语义理解的准确性
* jina-embeddings-v2-base对划分后的段落进行词嵌入,构建ChromaDB向量数据库
* bge-reranker-large对查询结果进行重排,优化检索的相关性
* 集成了RAGA(Retrieval Augmented Generation Annotator)评估工具,持续评测和改进系统性能

## 功能特色

* 内置圣经全文,支持在线浏览和智能搜索
* 基于Mistral-7B模型的AI助手,可以针对性地解答信仰和生活问题
* 融合了智能语句划分、语义检索、重排序等多项NLP技术,大幅提升经文理解和问答效果
* 支持跳转到AI回答中引用的经文原文
* 简洁大方的用户界面,操作直观易用

## 安装使用

1. 在Release页面下载最新安装包
2. 安装后打开应用
3. 开启与AI助手的对话,探索信仰和生活的真谛

## 应用截图

<div style="display:flex;"> <img src="image/README/1711184019283.png" width="300" style="margin-right:50px;"/> <img src="image/README/1711184030699.png" width="300"/> </div>

## 开发计划

* [ ] 引入Query Rewriting技术,实现问题表述的自动优化和扩展
* [ ] 实现Self-RAG,使AI助手能根据问题熟悉度采取快速回答或检索增强的应答模式
* [ ] 支持多语言版本的圣经
* [ ] 进一步压缩模型尺寸,优化应用性能
* [ ] 改进应用界面和用户体验
* [ ] 加入笔记、标注等功能

## 问题反馈

如果在使用中遇到任何问题或有任何建议,欢迎在Issues中反馈,我们会尽快跟进解决。

欢迎交流,祝使用愉快 :)
