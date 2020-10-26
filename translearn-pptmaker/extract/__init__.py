import json 


STOPWORDS = {'its', 'than', 'our', 'it', 'doing', 'three', 'and', 'both', 'at', 'less', 'latter', 'nowhere', 'here', 'although', 'been', 'from', 'used', 'being', 'everywhere', 'fill', 'toward', 'kg', 'could', 'interest', 'five', 'go', 'etc', 'due', 'until', 'has', 'few', 'make', 'might', 'all', 'thin', 'above', 'though', 'cant', 'various', 'cannot', 'sincere', 'of', 'is', 'move', 'somewhere', 'thereby', 'side', 'does', 'us', 'nothing', 'not', 'always', 'least', 'these', 'four', 'again', 'did', 'please', 'thereafter', 'thereupon', 'others', 'using', 'beside', 'beyond', 'an', 'sometime', 'now', 'cry', 'name', 'your', 'other', 'doesn', 'system', 'per', 'see', 'enough', 'are', 'serious', 'seems', 'part', 'whereafter', 'describe', 'whence', 'up', 'hereafter', 'six', 'already', 'this', 'fify', 'them', 'throughout', 'nevertheless', 'the', 'herself', 'elsewhere', 'two', 'call', 'he', 'every', 'me', 'hasnt', 'will', 'found', 'after', 'any', 'but', 'have', 'since', 'ourselves', 'someone', 'to', 'keep', 'therein', 'co', 'empty', 'yet', 'on', 'former', 'something', 'when', 'if', 'anyway', 'own', 'whom', 'fifteen', 'became', 'fire', 'had', 'hereby', 'one', 'some', 'among', 'whole', 'must', 'formerly', 'next', 'where', 'moreover', 'inc', 'himself', 'well', 'ours', 'such', 'anywhere', 'either', 'seeming', 'third', 'alone', 'very', 'because', 'same', 'what', 'thus', 'becoming', 'almost', 'through', 'itself', 'around', 'no', 'onto', 'sometimes', 'each', 'yours', 'amount', 'once', 're', 'why', 'thence', 'into', 'can', 'their', 'as', 'in', 'towards', 'con', 'his', 'de', 'afterwards', 'except', 'wherever', 'everything', 'twenty', 'regarding', 'whether', 'hereupon', 'whereby', 'namely', 'none', 'beforehand', 'detail', 'several', 'amoungst', 'by', 'anyone', 'ever', 'you', 'top', 'made', 'find', 'against', 'those', 'much', 'down', 'often', 'about', 'would', 'then', 'mill', 'without', 'thru', 'should', 'somehow', 'my', 'never', 'over', 'indeed', 'within', 'nine', 'un', 'may', 'mostly', 'ie', 'under', 'also', 'neither', 'was', 'mine', 'last', 'most', 'become', 'sixty', 'quite', 'wherein', 'so', 'say', 'noone', 'don', 'myself', 'anyhow', 'ltd', 'front', 'seem', 'show', 'who', 'more', 'whoever', 'really', 'just', 'else', 'besides', 'which', 'how', 'even', 'whenever', 'take', 'unless', 'a', 'i', 'bill', 'further', 'too', 'do', 'eg', 'forty', 'him', 'between', 'or', 'together', 'amongst', 'everyone', 'anything', 'becomes', 'upon', 'eight', 'hers', 'whose', 'rather', 'we', 'only', 'computer', 'out', 'along', 'she', 'via', 'give', 'however', 'off', 'that', 'twelve', 'nor', 'many', 'hence', 'therefore', 'nobody', 'hundred', 'whereas', 'whereupon', 'eleven', 'herein', 'for', 'yourself', 'km', 'with', 'perhaps', 'whither', 'bottom', 'couldnt', 'first', 'while', 'back', 'whatever', 'ten', 'put', 'get', 'didn', 'another', 'there', 'am', 'during', 'still', 'themselves', 'be', 'below', 'behind', 'otherwise', 'her', 'done', 'they', 'thick', 'meanwhile', 'before', 'yourselves', 'across', 'full', 'latterly', 'were', 'seemed'}



#Test data
bert = {
	"topic": "BERT",
	"no_of_head": 13,
	"introduction": "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
	"sections": [
			{
				
				"heading":  "Introduction",

				"content": [
					 {
						"title":"",
						"desc": ["There are two existing strategies for applying pre-trained language representations to down-stream tasks: feature-basedandfine-tuning."]

					},

					{
						"title":"",
						"desc": ["In this paper, we improve the fine-tuning based approaches by proposing  BERT:Bidirectional Encoder Representations from Transformers."]
					},

					{
						"title":"",
						"desc": ["BERT uses masked language models to enable pre-trained deep bidirectional representations."]
					},

					{
						"title":"",
						"desc": ["BERT  is  the  first  fine-tuning based representation model that achieves state-of-the-art  performance  on  a  large  suiteof sentence-levelandtoken-level tasks, outper-forming many task-specific architectures"]
					},

					{
						"title":"",
						"desc": ["BERT advances the state of the art for eleven NLP tasks."]
					}
				],

				"img": ""
			},


			{
				"heading":  " Unsupervised Feature-based Approaches",

				"content": [ 
					{
						"title": "",
						"desc": ["Pre-trained word embeddings are an integral part of modern NLP systems,  offering significant improvements over embeddingslearned from scratch."]
					},

					{
						"title": "",
						"desc": ["ELMo, is feature-based and not deeply bidirectional."]
					},

					{
						"title": "",
						"desc": ["ELMo and its predecessor generalize traditional word embedding re-search along a different dimension."]
					}
				],

			"img" : ""
		},


		{
			"heading":  " Unsupervised Fine-tuning Approaches",

			"content": [
				{
					"title": "",
					"desc": ["As with the feature-based approaches,  the first works in this direction only pre-trained word em-bedding  parameters from unlabeled text."]
				},

				{
					"title": "",
					"desc": ["The advantage of these approaches is that  few  parameters  need  to  be  learned  froms cratch."]
				},

				{
					"title": "",
					"desc": ["Left-to-right language  modeling  and  auto-encoder  objectives  have  been  used for pre-training such models."]
				}
			],
			"img" : "https://raw.githubusercontent.com/AmanGupta03/Assets/master/x1.png"
		},



		{
			"heading":  "Transfer Learning from Supervised Data",

			"content": [
				{
					"title": "",
					"desc": ["computer vision research has also demonstrated the importance of transfer learning from large pre-trained models, where an effective recipe is to fine-tune models pre-trained with ImageNet."]
				},
			],
			"img" : ""
		},

		{
			"heading":  "Pre-training BERT",

			"content": [
				{
					"title": "Task #1: Masked LM",
					"desc" : ["In order to train a deep bidirectional representa-tion, we simply mask some percentage of the input tokens at random"]
				},

			 	{
					"title": "Next Sentence Prediction (NSP)",
					"desc": ["In  order to  train  a  model  that  understands  sentence  rela-tionships,  we  pre-train  for  a  binarized next  sentence  predictiontask that can be trivially generated from any mono lingualcorpus", "We referred this procdedure as Masked LM"]
				}
			],
			"img" : ""
		},


		{
			"heading":  "Fine-tuning BERT",

			"content": [
				{
					"title": "",
					"desc": ["Fine-tuning   is   straightforward   since   the   self-attention   mechanism   in   the   Transformer   al-lows  BERT  to  model  many  downstream  tasks whether they involve single text or text pairs by swapping out the appropriate inputs and outputs."]
				},


				{
					"title": "",
					"desc": [" BERT instead uses the self-attention mechanism to unify these two stages, as encoding a concatenated textpair  with  self-attention  effectively  includesbidi-rectional cross attention between two sentences"]
				},


			],
			"img" : ""
		},

		{
			"heading":  "GLUE",

			"content" : [
				{
					"title": "",
					"desc": ["The General Language Understanding Evaluation(GLUE)"]
				},

				{
					"title": " ",
					"desc": ["collection of diverse natural language understanding tasks."]
				},
			],

			"img": ""
		},

		
		{
			"heading":  "SQuAD v1.1",

			"content" : [
			 	{
					"title": "",
					"desc": ["Stanford Question Answering Dataset"]
				},

				{
					"title": "",
					"desc": ["It is a  collection  of  100k  crowd-sourced  question/answer  pairs"]
				},

				{
					"title": "",
					"desc": ["Given  a  question  and  a  passage  from Wikipedia  containing  the  answer,  the  task  is  topredict the answer text span in the passage"]
				},

				{
					"title": "",
					"desc": ["we represent the input question and pas-sage as a single packed sequence, with the question using the A embedding and the passage usingt the B embedding"]
				},


				{
					"title": "",
					"desc": ["We only introduce a start S e R Hand an end vector E e R during fine-tuning", "The probability of wordibeing thestart of the answer span is computed as a dot product between T i and S followed by a softmax overall of the words in the the paragraph Pi=es.TiZjes.Tz"]
				}

			],
			"img": ""
		},


		
		{
			"heading":  "SQuAD v2.0",
			"content": [
				{
					"title": "",
					"desc": ["The  SQuAD  2.0  task  extends  the  SQuAD  1.1problem definition by allowing for the possibilitythat no short answer exists in the provided para-graph, making the problem more realistic"]
				}
			],
			"img": ""
		},

		{
			"heading":  "SWAG",
			"content": [ 
				{
					"title": "",
					"desc": ["The   Situations   With   Adversarial   Generations(SWAG) dataset contains 113k sentence-pair com-pletion examples that evaluate grounded common-sense inference"]
				},

				{
					"title": "",
					"desc": ["Given a sen-tence, the task is to choose the most plausible continuation among four choices"]
				}
			],
			"img": ""
		},

		
		{
			"heading":  "Ablation Studies",
			"content": [
				{
					"title": "",
					"desc": ["we perform ablation experimentsover a number of facets of BERT in order to betterunderstand their relative importance"]
				}
			],
			"img" : ""
		},

		
		{
			"heading":  "Feature-based Approach with BERT",
			"content": [
				{
					"title": "",
					"desc": ["All of the BERT results presented so far have usedthe fine-tuning approach, where a simple classifi-cation layer is added to the pre-trained model, andall  parameters  are  jointly  fine-tuned  on  a  down-stream task"]
				},

				{
					"title": "",
					"desc": ["there  are  major  computational  benefitsto pre-compute an expensive representation of the training data once and then run many experiments with cheaper models on top of this representation"]
				}

			],
			"img" : ""
		},

		
		{
			"heading":  "Conclusion",
			"content": [
				{
					"title": "",
					"desc": ["Recent  empirical  improvements  due  to  transferlearning with language models have demonstrated that rich, unsupervised pre-training is an integral part of many language understanding systems"]
				},

				{
						"title": "",
						"desc": ["Our major contribution is further general-izing these findings to deepbidirectional architec-tures, allowing the same pre-trained model to suc-cessfully tackle a broad set of NLP tasks"]
				}
			],
			"img" : ""
		}
	] 
}


ml = {
    "topic": "Machine Learning",
    "no_of_head": 16,
    "introduction": "Machine learning (ML) is the study of computer algorithms that improve automatically through experience.",
    "sections": [
        {
            "heading": "Overview",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Machine learning involves computers discovering how they can perform tasks without being explicitly programmed to do so.",
                        "It involves computers learning from data provided so that they carry out certain tasks."
                    ]
                },
                {
                    "title": "Machine learning approaches",
                    "desc": [
                        "Machine learning approaches are traditionally divided into three broad categories, depending on the nature of the \"signal\" or \"feedback\" available to the learning system:",
                        "Supervised learning: The computer is presented with example inputs and their desired outputs, given by a \"teacher\", and the goal is to learn a general rule that maps inputs to outputs."
                    ]
                }
            ]
        },
        {
            "heading": "History and relationships to other fields",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "The term machine learning was coined in 1959 by Arthur Samuel, an American IBMer and pioneer in the field of computer gaming and artificial intelligence."
                    ]
                },
                {
                    "title": "Artificial intelligence",
                    "desc": [
                        "As a scientific endeavor, machine learning grew out of the quest for artificial intelligence.",
                        "In the early days of AI as an academic discipline, some researchers were interested in having machines learn from data."
                    ]
                },
                {
                    "title": "Data mining",
                    "desc": [
                        "Machine learning and data mining often employ the same methods and overlap significantly, but while machine learning focuses on prediction, based on known properties learned from the training data, data mining focuses on the discovery of (previously) unknown properties in the data (this is the analysis step of knowledge discovery in databases)."
                    ]
                },
                {
                    "title": "Optimization",
                    "desc": [
                        "Machine learning also has intimate ties to optimization: many learning problems are formulated as minimization of some loss function on a training set of examples."
                    ]
                },
                {
                    "title": "Statistics",
                    "desc": [
                        "Machine learning and statistics are closely related fields in terms of methods, but distinct in their principal goal: statistics draws population inferences from a sample, while machine learning finds generalizable predictive patterns."
                    ]
                }
            ]
        },
        {
            "heading": "Theory",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "A core objective of a learner is to generalize from its experience.",
                        "Generalization in this context is the ability of a learning machine to perform accurately on new, unseen examples/tasks after having experienced a learning data set.",
                        "The training examples come from some generally unknown probability distribution (considered representative of the space of occurrences) and the learner has to build a general model about this space that enables it to produce sufficiently accurate predictions in new cases.",
                        "The computational analysis of machine learning algorithms and their performance is a branch of theoretical computer science known as computational learning theory.",
                        "Because training sets are finite and the future is uncertain, learning theory usually does not yield guarantees of the performance of algorithms."
                    ]
                }
            ]
        },
        {
            "heading": "Approaches",
            "img": "",
            "content": [
                {
                    "title": "Types of learning algorithms",
                    "desc": [
                        "The types of machine learning algorithms differ in their approach, the type of data they input and output, and the type of task or problem that they are intended to solve."
                    ]
                },
                {
                    "title": "Models",
                    "desc": []
                },
                {
                    "title": "Training models",
                    "desc": [
                        "Usually, machine learning models require a lot of data in order for them to perform well.",
                        "Usually, when training a machine learning model, one needs to collect a large, representative sample of data from a training set.",
                        "Data from the training set can be as varied as a corpus of text, a collection of images, and data collected from individual users of a service."
                    ]
                }
            ]
        },
        {
            "heading": "Applications",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "There are many applications for machine learning, including:",
                        "In 2006, the media-services provider Netflix held the first \"Netflix Prize\" competition to find a program to better predict user preferences and improve the accuracy on its existing Cinematch movie recommendation algorithm by at least 10%.",
                        "A joint team made up of researchers from AT&T Labs-Research in collaboration with the teams Big Chaos and Pragmatic Theory built an ensemble model to win the Grand Prize in 2009 for $1 million.",
                        "Shortly after the prize was awarded, Netflix realized that viewers' ratings were not the best indicators of their viewing patterns (\"everything is a recommendation\") and they changed their recommendation engine accordingly.",
                        "In 2010 The Wall Street Journal wrote about the firm Rebellion Research and their use of machine learning to predict the financial crisis."
                    ]
                }
            ]
        },
        {
            "heading": "Limitations",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Although machine learning has been transformative in some fields, machine-learning programs often fail to deliver expected results."
                    ]
                },
                {
                    "title": "Bias",
                    "desc": [
                        "Machine learning approaches in particular can suffer from different data biases.",
                        "A machine learning system trained on current customers only may not be able to predict the needs of new customer groups that are not represented in the training data.",
                        "When trained on man-made data, machine learning is likely to pick up the same constitutional and unconscious biases already present in society.",
                        "Language models learned from data have been shown to contain human-like biases."
                    ]
                }
            ]
        },
        {
            "heading": "Model assessments",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Classification machine learning models can be validated by accuracy estimation techniques like the Holdout method, which splits the data in a training and test set (conventionally 2/3 training set and 1/3 test set designation) and evaluates the performance of the training model on the test set.",
                        "In comparison, the K-fold-cross-validation method randomly partitions the data into K subsets and then K experiments are performed each respectively considering 1 subset for evaluation and the remaining K-1 subsets for training the model.",
                        "In addition to the holdout and cross-validation methods, bootstrap, which samples n instances with replacement from the dataset, can be used to assess model accuracy.In addition to overall accuracy, investigators frequently report sensitivity and specificity meaning True Positive Rate (TPR) and True Negative Rate (TNR) respectively.",
                        "Similarly, investigators sometimes report the False Positive Rate (FPR) as well as the False Negative Rate (FNR).",
                        "However, these rates are ratios that fail to reveal their numerators and denominators."
                    ]
                }
            ]
        },
        {
            "heading": "Ethics",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Machine learning poses a host of ethical questions.",
                        "Systems which are trained on datasets collected with biases may exhibit these biases upon use (algorithmic bias), thus digitizing cultural prejudices.",
                        "For example, using job hiring data from a firm with racist hiring policies may lead to a machine learning system duplicating the bias by scoring job applicants against similarity to previous successful applicants.",
                        "Responsible collection of data and documentation of algorithmic rules used by a system thus is a critical part of machine learning.",
                        "Because human languages contain biases, machines trained on language corpora will necessarily also learn these biases.Other forms of ethical challenges, not related to personal biases, are more seen in health care."
                    ]
                }
            ]
        },
        {
            "heading": "Hardware",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Since the 2010s, advances in both machine learning algorithms and computer hardware have led to more efficient methods for training deep neural networks (a particular narrow subdomain of machine learning) that contain many layers of non-linear hidden units.",
                        "By 2019, graphic processing units (GPUs), often with AI-specific enhancements, had displaced CPUs as the dominant method of training large-scale commercial cloud AI.",
                        "OpenAI estimated the hardware compute used in the largest deep learning projects from AlexNet (2012) to AlphaZero (2017), and found a 300,000-fold increase in the amount of compute required, with a doubling-time trendline of 3.4 months."
                    ]
                }
            ]
        },
        {
            "heading": "Software",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Software suites containing a variety of machine learning algorithms include the following:"
                    ]
                },
                {
                    "title": "Free and open-source software",
                    "desc": []
                },
                {
                    "title": "Proprietary software with free and open-source editions",
                    "desc": []
                },
                {
                    "title": "Proprietary software",
                    "desc": []
                }
            ]
        },
        {
            "heading": "Journals",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Journal of Machine Learning Research\nMachine Learning\nNature Machine Intelligence\nNeural Computation"
                    ]
                }
            ]
        },
        {
            "heading": "Conferences",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Conference on Neural Information Processing Systems\nInternational Conference on Machine Learning"
                    ]
                }
            ]
        },
        {
            "heading": "See also",
            "img": "",
            "content": []
        },
        {
            "heading": "References",
            "img": "",
            "content": []
        },
        {
            "heading": "Further reading",
            "img": "",
            "content": []
        },
        {
            "heading": "External links",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "International Machine Learning Society\nmloss is an academic database of open-source machine learning software.",
                        "Machine Learning Crash Course by Google.",
                        "This is a free course on machine learning through the use of TensorFlow."
                    ]
                }
            ]
        }
    ]
}







java = {
    "topic": "java_(programming language)",
    "no_of_head": 14,
    "introduction": "Java is a general-purpose programming language that is class-based, object-oriented, and designed to have as few implementation dependencies as possible.",
    "sections": [
        {
            "heading": "History",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "James Gosling, Mike Sheridan, and Patrick Naughton initiated the Java language project in June 1991.",
                        "Java was originally designed for interactive television, but it was too advanced for the digital cable television industry at the time.",
                        "The language was initially called Oak after an oak tree that stood outside Gosling's office.",
                        "Later the project went by the name Green and was finally renamed Java, from Java coffee, the coffee from Indonesia."
                    ]
                },
                {
                    "title": "Principles",
                    "desc": [
                        "There were five primary goals in the creation of the Java language:"
                    ]
                },
                {
                    "title": "Versions",
                    "desc": []
                }
            ]
        },
        {
            "heading": "Editions",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Sun has defined and supports four editions of Java targeting different application environments and segmented many of its APIs so that they belong to one of the platforms.",
                        "The platforms are:",
                        "Java Card for smart-cards.",
                        "Java Platform, Micro Edition (Java ME) \u2013 targeting environments with limited resources.",
                        "Java Platform, Standard Edition (Java SE) \u2013 targeting workstation environments."
                    ]
                }
            ]
        },
        {
            "heading": "Execution system",
            "img": "",
            "content": [
                {
                    "title": "Java JVM and bytecode",
                    "desc": [
                        "One design goal of Java is portability, which means that programs written for the Java platform must run similarly on any combination of hardware and operating system with adequate run time support."
                    ]
                },
                {
                    "title": "Non-JVM",
                    "desc": [
                        "Some platforms offer direct hardware support for Java; there are micro controllers that can run Java bytecode in hardware instead of a software Java virtual machine, and some ARM-based processors could have hardware support for executing Java bytecode through their Jazelle option, though support has mostly been dropped in current implementations of ARM."
                    ]
                },
                {
                    "title": "Automatic memory management",
                    "desc": [
                        "Java uses an automatic garbage collector ( AGC ) to manage memory in the object lifecycle.",
                        "The programmer determines when objects are created, and the Java runtime is responsible for recovering the memory once objects are no longer in use.",
                        "Once no references to an object remain, the unreachable memory becomes eligible to be freed automatically by the garbage collector.",
                        "Something similar to a memory leak may still occur if a programmer's code holds a reference to an object that is no longer needed, typically when objects that are no longer needed are stored in containers that are still in use."
                    ]
                }
            ]
        },
        {
            "heading": "Syntax",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "The syntax of Java is largely influenced by C++ and C."
                    ]
                },
                {
                    "title": "Hello world example",
                    "desc": [
                        "The traditional Hello world program can be written in Java as:",
                        "All source files must be named after the public class they contain, appending the suffix .java, for example, HelloWorldApp.java.",
                        "It must first be compiled into bytecode, using a Java compiler, producing a file with the .class suffix (HelloWorldApp.class, in this case).",
                        "The Java source file may only contain one public class, but it can contain multiple classes with a non-public access modifier and any number of public inner classes."
                    ]
                },
                {
                    "title": "Example with methods",
                    "desc": []
                }
            ]
        },
        {
            "heading": "Special classes",
            "img": "",
            "content": [
                {
                    "title": "Applet",
                    "desc": []
                },
                {
                    "title": "Servlet",
                    "desc": [
                        "Java servlet technology provides Web developers with a simple, consistent mechanism for extending the functionality of a Web server and for accessing existing business systems."
                    ]
                },
                {
                    "title": "JavaServer Pages",
                    "desc": [
                        "JavaServer Pages (JSP) are server-side Java EE components that generate responses, typically HTML pages, to HTTP requests from clients."
                    ]
                },
                {
                    "title": "Swing application",
                    "desc": [
                        "Swing is a graphical user interface library for the Java SE platform."
                    ]
                },
                {
                    "title": "JavaFX application",
                    "desc": [
                        "JavaFX is a software platform for creating and delivering desktop applications, as well as rich Internet applications (RIAs) that can run across a wide variety of devices."
                    ]
                },
                {
                    "title": "Generics",
                    "desc": [
                        "In 2004, generics were added to the Java language, as part of J2SE 5.0."
                    ]
                }
            ]
        },
        {
            "heading": "Criticism",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Criticisms directed at Java include the implementation of generics, speed, the handling of unsigned numbers, the implementation of floating-point arithmetic, and a history of security vulnerabilities in the primary Java VM implementation HotSpot."
                    ]
                }
            ]
        },
        {
            "heading": "Class libraries",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "The Java Class Library is the standard library, developed to support application development in Java.",
                        "It is controlled by Oracle in cooperation with others through the Java Community Process program.",
                        "Companies or individuals participating in this process can influence the design and development of the APIs. This process has been a subject of controversy during the 2010s.",
                        "The class library contains features such as:",
                        "The core libraries, which include:"
                    ]
                }
            ]
        },
        {
            "heading": "Documentation",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Javadoc is a comprehensive documentation system, created by Sun Microsystems.",
                        "It provides developers with an organized system for documenting their code.",
                        "Javadoc comments have an extra asterisk at the beginning, i.e.",
                        "the delimiters are /** and */, whereas the normal multi-line comments in Java are set off with the delimiters /* and */."
                    ]
                }
            ]
        },
        {
            "heading": "Implementations",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "Oracle Corporation is the current owner of the official implementation of the Java SE platform, following their acquisition of Sun Microsystems on January 27, 2010.",
                        "This implementation is based on the original implementation of Java by Sun. The Oracle implementation is available for Microsoft Windows (still works for XP, while only later versions are currently officially supported), macOS, Linux, and Solaris.",
                        "Because Java lacks any formal standardization recognized by Ecma International, ISO/IEC, ANSI, or other third-party standards organization, the Oracle implementation is the de facto standard.",
                        "The Oracle implementation is packaged into two different distributions: The Java Runtime Environment (JRE) which contains the parts of the Java SE platform required to run Java programs and is intended for end users, and the Java Development Kit (JDK), which is intended for software developers and includes development tools such as the Java compiler, Javadoc, Jar, and a debugger.",
                        "Oracle has also released GraalVM, a high performance Java dynamic compiler and interpreter."
                    ]
                }
            ]
        },
        {
            "heading": "Use outside the Java platform",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "The Java programming language requires the presence of a software platform in order for compiled programs to be executed.",
                        "Oracle supplies the Java platform for use with Java."
                    ]
                },
                {
                    "title": "Android",
                    "desc": [
                        "The Java language is a key pillar in Android, an open source mobile operating system.",
                        "Although Android, built on the Linux kernel, is written largely in C, the Android SDK uses the Java language as the basis for Android applications but does not use any of its standard GUI, SE, ME or other established Java standards.",
                        "The bytecode language supported by the Android SDK is incompatible with Java bytecode and runs on its own virtual machine, optimized for low-memory devices such as smartphones and tablet computers."
                    ]
                }
            ]
        },
        {
            "heading": "See also",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        "C#\nC++\nDalvik, used in old Android versions, replaced by non-JIT Android Runtime\nDeterministic Parallel Java\nList of Java virtual machines\nList of Java APIs\nList of JVM languages"
                    ]
                },
                {
                    "title": "Comparison of Java with other languages",
                    "desc": [
                        "Comparison of C# and Java\nComparison of Java and C++"
                    ]
                }
            ]
        },
        {
            "heading": "References",
            "img": "",
            "content": []
        },
        {
            "heading": "Works cited",
            "img": "",
            "content": []
        },
        {
            "heading": "External links",
            "img": "",
            "content": [
                {
                    "title": "",
                    "desc": [
                        " The dictionary definition of Java at Wiktionary\n Media related to Java at Wikimedia Commons\n Java at Wikibooks\n Learning materials related to Java at Wikiversity"
                    ]
                }
            ]
        }
    ]
}